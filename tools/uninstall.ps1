$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0
$PackRoot = Split-Path -Parent $PSScriptRoot
$LogPath = Join-Path $PackRoot 'uninstall_result.txt'
$StateBase = Join-Path $env:APPDATA 'KidsBlock\EducationPack'
$StatePath = Join-Path $StateBase 'install_state.json'

function Write-Log([string]$Text) {
    $line = "{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Text
    $line | Tee-Object -FilePath $LogPath -Append
}
'' | Set-Content -LiteralPath $LogPath -Encoding UTF8
try {
    if (-not (Test-Path -LiteralPath $StatePath)) { throw "Install state not found: $StatePath" }
    $state = Get-Content -LiteralPath $StatePath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($entry in $state.entries) {
        $action = [string]$entry.action
        if ($action -eq 'Skipped') {
            Write-Log "[$($entry.label)] Kept unchanged: $($entry.display)"
            continue
        }

        if ($action -eq 'Replaced') {
            # Backward compatibility with install states created before Updated was introduced.
            $action = 'Updated'
        }

        if ($action -notin @('Installed', 'Updated')) {
            throw "Unknown install action '$($entry.action)' for: $($entry.target)"
        }

        if ($action -eq 'Updated') {
            if (-not $entry.backup -or -not (Test-Path -LiteralPath $entry.backup -PathType Container)) {
                throw "Backup not found for updated extension: $($entry.target)"
            }
        }

        if (Test-Path -LiteralPath $entry.target) {
            Remove-Item -LiteralPath $entry.target -Recurse -Force
            Write-Log "[$($entry.label)] Removed pack copy: $($entry.target)"
        }

        if ($action -eq 'Updated') {
            New-Item -ItemType Directory -Force -Path (Split-Path -Parent $entry.target) | Out-Null
            Copy-Item -LiteralPath $entry.backup -Destination $entry.target -Recurse -Force
            Write-Log "[$($entry.label)] Restored previous copy: $($entry.target)"
        }
    }
    $archived = Join-Path $StateBase ("uninstalled_state_{0}.json" -f (Get-Date -Format 'yyyyMMdd_HHmmss'))
    Move-Item -LiteralPath $StatePath -Destination $archived -Force
    Write-Log "Archived state: $archived"
    Write-Host ''
    Write-Host 'Uninstallation completed successfully.'
    Write-Host "Log: $LogPath"
    exit 0
} catch {
    Write-Log ("ERROR: " + $_.Exception.Message)
    Write-Error $_
    exit 1
}
