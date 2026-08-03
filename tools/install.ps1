$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

$PackRoot = Split-Path -Parent $PSScriptRoot
$SourceRoot = Join-Path $PackRoot 'extensions'
$ManifestPath = Join-Path $PackRoot 'manifest.json'
$LogPath = Join-Path $PackRoot 'install_result.txt'
$StateBase = Join-Path $env:APPDATA 'KidsBlock\EducationPack'
$BackupBase = Join-Path $StateBase 'Backups'
$StatePath = Join-Path $StateBase 'install_state.json'

function Write-Log([string]$Text) {
    $line = "{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Text
    $line | Tee-Object -FilePath $LogPath -Append | Out-Null
}

function Get-TreeHash([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return $null }
    $rows = Get-ChildItem -LiteralPath $Path -File -Recurse |
        Sort-Object FullName |
        ForEach-Object {
            $rel = $_.FullName.Substring($Path.Length).TrimStart('\')
            "{0}|{1}" -f $rel, (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash
        }
    $bytes = [Text.Encoding]::UTF8.GetBytes(($rows -join "`n"))
    $sha = [Security.Cryptography.SHA256]::Create()
    try { return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '') }
    finally { $sha.Dispose() }
}

function Find-DesktopRoot {
    $candidates = @(
        'C:\KidsBlock Desktop',
        (Join-Path $env:ProgramFiles 'KidsBlock Desktop'),
        (Join-Path ${env:ProgramFiles(x86)} 'KidsBlock Desktop'),
        (Join-Path $env:LOCALAPPDATA 'Programs\KidsBlock Desktop')
    ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }

    foreach ($base in $candidates) {
        if (Test-Path -LiteralPath (Join-Path $base 'resources')) {
            return (Join-Path $base 'resources\external-resources\extensions\arduino')
        }
    }
    return $null
}

function Read-And-VerifyManifest {
    if (-not (Test-Path -LiteralPath $ManifestPath)) {
        throw "Missing manifest: $ManifestPath"
    }

    $manifest = Get-Content -LiteralPath $ManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if (-not $manifest.packVersion) { throw 'Manifest has no packVersion.' }
    if (-not $manifest.extensions) { throw 'Manifest has no extensions list.' }
    if (-not $manifest.files) { throw 'Manifest has no files list.' }

    foreach ($file in $manifest.files) {
        $relative = ([string]$file.path) -replace '/', '\'
        $fullPath = Join-Path $PackRoot $relative
        if (-not (Test-Path -LiteralPath $fullPath)) {
            throw "Missing package file: $($file.path)"
        }
        $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $fullPath).Hash.ToLowerInvariant()
        $expected = ([string]$file.sha256).ToLowerInvariant()
        if ($actual -ne $expected) {
            throw "Package verification failed: $($file.path)"
        }
        if ($null -ne $file.size -and (Get-Item -LiteralPath $fullPath).Length -ne [int64]$file.size) {
            throw "Package size verification failed: $($file.path)"
        }
    }

    Write-Log ("Package verified: {0} files" -f $manifest.files.Count)
    return $manifest
}

'' | Set-Content -LiteralPath $LogPath -Encoding UTF8

try {
    if (-not (Test-Path -LiteralPath $SourceRoot)) {
        throw "Missing extensions folder: $SourceRoot"
    }

    $manifest = Read-And-VerifyManifest
    $PackVersion = [string]$manifest.packVersion
    $Stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
    $BackupRoot = Join-Path $BackupBase ("v{0}_{1}" -f $PackVersion, $Stamp)

    $Items = @($manifest.extensions | ForEach-Object {
        [pscustomobject]@{
            Category = [string]$_.category
            Name = [string]$_.folder
            Display = [string]$_.displayName
        }
    })

    New-Item -ItemType Directory -Force -Path $StateBase, $BackupRoot | Out-Null

    $state = [ordered]@{
        packVersion = $PackVersion
        installedAt = (Get-Date).ToString('s')
        backupRoot = $BackupRoot
        targets = @()
        entries = @()
    }

    $targets = @()
    $desktopRoot = Find-DesktopRoot
    if ($desktopRoot) {
        $targets += [pscustomobject]@{ Label = 'Desktop'; Root = $desktopRoot }
    } else {
        Write-Log 'WARNING: KidsBlock desktop installation was not detected.'
    }

    $appDataRoot = Join-Path $env:APPDATA 'KidsBlock\Data\external-resources\extensions\arduino'
    $targets += [pscustomobject]@{ Label = 'AppData'; Root = $appDataRoot }

    foreach ($targetInfo in $targets) {
        $root = $targetInfo.Root
        New-Item -ItemType Directory -Force -Path $root | Out-Null
        $state.targets += [ordered]@{ label = $targetInfo.Label; root = $root }

        foreach ($item in $Items) {
            $source = Join-Path (Join-Path $SourceRoot $item.Category) $item.Name
            $target = Join-Path (Join-Path $root $item.Category) $item.Name

            if (-not (Test-Path -LiteralPath (Join-Path $source 'index.js'))) {
                throw "Incomplete source: $source"
            }

            $sourceHash = Get-TreeHash $source
            $targetHash = Get-TreeHash $target
            $action = 'Installed'
            $backup = $null

            if ($targetHash -and $targetHash -eq $sourceHash) {
                $action = 'Skipped'
                Write-Log "[$($targetInfo.Label)] Skipped unchanged: $($item.Display)"
            } else {
                if (Test-Path -LiteralPath $target) {
                    $action = 'Replaced'
                    $backup = Join-Path (Join-Path $BackupRoot $targetInfo.Label) (Join-Path $item.Category $item.Name)
                    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backup) | Out-Null
                    Copy-Item -LiteralPath $target -Destination $backup -Recurse -Force
                    Remove-Item -LiteralPath $target -Recurse -Force
                    Write-Log "[$($targetInfo.Label)] Backup: $target"
                }

                New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target) | Out-Null
                Copy-Item -LiteralPath $source -Destination $target -Recurse -Force

                if ((Get-TreeHash $target) -ne $sourceHash) {
                    throw "Post-copy verification failed: $target"
                }
                Write-Log "[$($targetInfo.Label)] ${action}: $($item.Display)"
            }

            $state.entries += [ordered]@{
                label = $targetInfo.Label
                root = $root
                category = $item.Category
                name = $item.Name
                display = $item.Display
                action = $action
                target = $target
                backup = $backup
                installedHash = $sourceHash
            }
        }
    }

    $state | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $StatePath -Encoding UTF8
    Copy-Item -LiteralPath $StatePath -Destination (Join-Path $BackupRoot 'install_state.json') -Force

    Write-Log "State: $StatePath"
    Write-Log "Backup: $BackupRoot"
    Write-Host ''
    Write-Host 'Installation completed successfully.'
    Write-Host ("Installed {0} extensions." -f $Items.Count)
    Write-Host "Version: $PackVersion"
    Write-Host "Log: $LogPath"
    exit 0
}
catch {
    Write-Log ("ERROR: " + $_.Exception.Message)
    Write-Error $_
    exit 1
}
