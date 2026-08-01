$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

$PackVersion = '0.3-Preview'
$PackRoot = Split-Path -Parent $PSScriptRoot
$SourceRoot = Join-Path $PackRoot 'extensions'
$ManifestPath = Join-Path $PackRoot 'manifest.json'
$LogPath = Join-Path $PackRoot 'install_result.txt'
$StateBase = Join-Path $env:APPDATA 'KidsBlock\EducationPack'
$BackupBase = Join-Path $StateBase 'Backups'
$StatePath = Join-Path $StateBase 'install_state.json'
$Stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$BackupRoot = Join-Path $BackupBase ("v{0}_{1}" -f $PackVersion,$Stamp)

$Items = @(
    [pscustomobject]@{ Category='other'; Name='kbsd_esp32'; Display='KBSD ESP32' },
    [pscustomobject]@{ Category='other'; Name='kbcsv_esp32'; Display='KBCSV ESP32' },
    [pscustomobject]@{ Category='other'; Name='environment'; Display='Environment' },
    [pscustomobject]@{ Category='other'; Name='httpserver'; Display='HTTP Server' },
    [pscustomobject]@{ Category='other'; Name='bleuart3'; Display='BLE UART3' },
    [pscustomobject]@{ Category='other'; Name='ntpclock'; Display='NTPClock' },
    [pscustomobject]@{ Category='other'; Name='thingspeak'; Display='ThingSpeak' },
    [pscustomobject]@{ Category='other'; Name='wifisimple'; Display='SimpleWiFi' }
)
function Write-Log([string]$Text) { $line = "{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),$Text; $line | Tee-Object -FilePath $LogPath -Append }
function Get-TreeHash([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return $null }
    $rows = Get-ChildItem -LiteralPath $Path -File -Recurse | Sort-Object FullName | ForEach-Object {
        $rel = $_.FullName.Substring($Path.Length).TrimStart('\'); "{0}|{1}" -f $rel,(Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash
    }
    $bytes=[Text.Encoding]::UTF8.GetBytes(($rows -join "`n")); $sha=[Security.Cryptography.SHA256]::Create()
    try { return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-','') } finally { $sha.Dispose() }
}
function Find-DesktopRoot {
    $candidates=@('C:\KidsBlock Desktop',(Join-Path $env:ProgramFiles 'KidsBlock Desktop'),(Join-Path ${env:ProgramFiles(x86)} 'KidsBlock Desktop'),(Join-Path $env:LOCALAPPDATA 'Programs\KidsBlock Desktop')) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
    foreach($base in $candidates){ $root=Join-Path $base 'resources\external-resources\extensions\arduino'; if(Test-Path -LiteralPath (Join-Path $base 'resources')){ return $root } }
    return $null
}
function Verify-Package {
    if(-not(Test-Path -LiteralPath $ManifestPath)){throw "Missing manifest: $ManifestPath"}
    $manifest=Get-Content -LiteralPath $ManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if($manifest.packVersion -ne $PackVersion){throw 'Manifest version mismatch.'}
    foreach($file in $manifest.files){ $fp=Join-Path $PackRoot ($file.path -replace '/','\'); if(-not(Test-Path -LiteralPath $fp)){throw "Missing package file: $($file.path)"}; $actual=(Get-FileHash -Algorithm SHA256 -LiteralPath $fp).Hash.ToLowerInvariant(); if($actual -ne ([string]$file.sha256).ToLowerInvariant()){throw "Package verification failed: $($file.path)"} }
    Write-Log ("Package verified: {0} files" -f $manifest.files.Count)
}
'' | Set-Content -LiteralPath $LogPath -Encoding UTF8
$state=[ordered]@{packVersion=$PackVersion;installedAt=(Get-Date).ToString('s');backupRoot=$BackupRoot;targets=@();entries=@()}
try {
    if(-not(Test-Path -LiteralPath $SourceRoot)){throw "Missing extensions folder: $SourceRoot"}
    Verify-Package
    New-Item -ItemType Directory -Force -Path $StateBase,$BackupRoot | Out-Null
    $targets=@(); $desktopRoot=Find-DesktopRoot
    if($desktopRoot){$targets += [pscustomobject]@{Label='Desktop';Root=$desktopRoot}} else {Write-Log 'WARNING: KidsBlock desktop installation was not detected.'}
    $appDataRoot=Join-Path $env:APPDATA 'KidsBlock\Data\external-resources\extensions\arduino'; $targets += [pscustomobject]@{Label='AppData';Root=$appDataRoot}
    foreach($targetInfo in $targets){
        $root=$targetInfo.Root; New-Item -ItemType Directory -Force -Path $root | Out-Null; $state.targets += [ordered]@{label=$targetInfo.Label;root=$root}
        foreach($item in $Items){
            $source=Join-Path (Join-Path $SourceRoot $item.Category) $item.Name; $target=Join-Path (Join-Path $root $item.Category) $item.Name
            if(-not(Test-Path -LiteralPath (Join-Path $source 'index.js'))){throw "Incomplete source: $source"}
            $sourceHash=Get-TreeHash $source; $targetHash=Get-TreeHash $target; $action='Installed'; $backup=$null
            if($targetHash -and $targetHash -eq $sourceHash){$action='Skipped';Write-Log "[$($targetInfo.Label)] Skipped unchanged: $($item.Display)"}
            else {
                if(Test-Path -LiteralPath $target){$action='Replaced';$backup=Join-Path (Join-Path $BackupRoot $targetInfo.Label) (Join-Path $item.Category $item.Name);New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backup)|Out-Null;Copy-Item -LiteralPath $target -Destination $backup -Recurse -Force;Remove-Item -LiteralPath $target -Recurse -Force;Write-Log "[$($targetInfo.Label)] Backup: $target"}
                New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target)|Out-Null;Copy-Item -LiteralPath $source -Destination $target -Recurse -Force
                if((Get-TreeHash $target) -ne $sourceHash){throw "Post-copy verification failed: $target"};Write-Log "[$($targetInfo.Label)] ${action}: $($item.Display)"
            }
            $state.entries += [ordered]@{label=$targetInfo.Label;root=$root;category=$item.Category;name=$item.Name;display=$item.Display;action=$action;target=$target;backup=$backup;installedHash=$sourceHash}
        }
    }
    $state|ConvertTo-Json -Depth 6|Set-Content -LiteralPath $StatePath -Encoding UTF8;Copy-Item -LiteralPath $StatePath -Destination (Join-Path $BackupRoot 'install_state.json') -Force
    Write-Log "State: $StatePath";Write-Log "Backup: $BackupRoot";Write-Host '';Write-Host 'Installation completed successfully.';Write-Host 'Installed 8 extensions in the other category.';Write-Host "Log: $LogPath";exit 0
} catch {Write-Log ("ERROR: "+$_.Exception.Message);Write-Error $_;exit 1}
