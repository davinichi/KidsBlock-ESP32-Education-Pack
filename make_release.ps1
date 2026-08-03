param(
    [Parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]$PackVersion = '1.0.0',

    [Parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]$ReleaseDate = (Get-Date -Format 'yyyy-MM-dd'),

    [Parameter(Mandatory = $false)]
    [ValidateSet('Stable Release', 'Preview Release', 'Beta Release')]
    [string]$ReleaseStatus = 'Stable Release'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

$PackName = 'KidsBlock ESP32 Education Pack'
$SourceRoot = $PSScriptRoot
$DistRoot = Join-Path $SourceRoot 'dist'
$FolderName = "KidsBlock-ESP32-Education-Pack-v$PackVersion"
$StageRoot = Join-Path $DistRoot $FolderName
$ZipPath = Join-Path $DistRoot ("{0}.zip" -f $FolderName)
$ZipHashPath = "$ZipPath.sha256.txt"
$VerifyRoot = Join-Path $DistRoot '_verify'

function Write-Step {
    param([string]$Message)
    Write-Host ("[INFO] {0}" -f $Message)
}

function Assert-File {
    param([string]$Path, [string]$Description)
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Missing $Description`: $Path"
    }
}

function Assert-Directory {
    param([string]$Path, [string]$Description)
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        throw "Missing $Description`: $Path"
    }
}

function Get-DisplayName {
    param([string]$IndexPath, [string]$Fallback)

    if (-not (Test-Path -LiteralPath $IndexPath -PathType Leaf)) {
        return $Fallback
    }

    $text = Get-Content -LiteralPath $IndexPath -Raw -Encoding UTF8
    $match = [regex]::Match($text, 'default\s*:\s*[''\"]([^''\"]+)[''\"]')
    if ($match.Success) {
        return $match.Groups[1].Value
    }
    return $Fallback
}

function New-PackageManifest {
    param([string]$PackageRoot)

    $extensionsRoot = Join-Path $PackageRoot 'extensions'
    Assert-Directory $extensionsRoot 'extensions folder'

    $extensionRows = @()

    Get-ChildItem -LiteralPath $extensionsRoot -Directory |
        Sort-Object Name |
        ForEach-Object {
            $categoryDirectory = $_

            Get-ChildItem -LiteralPath $categoryDirectory.FullName -Directory |
                Sort-Object Name |
                ForEach-Object {
                    $extensionDirectory = $_
                    $indexPath = Join-Path $extensionDirectory.FullName 'index.js'

                    if (Test-Path -LiteralPath $indexPath -PathType Leaf) {
                        $extensionRows += [ordered]@{
                            category    = $categoryDirectory.Name
                            folder      = $extensionDirectory.Name
                            displayName = Get-DisplayName $indexPath $extensionDirectory.Name
                        }
                    }
                }
        }

    if ($extensionRows.Count -eq 0) {
        throw 'No KidsBlock extensions were discovered.'
    }

    $fileRows = @()

    Get-ChildItem -LiteralPath $extensionsRoot -File -Recurse |
        Sort-Object FullName |
        ForEach-Object {
            $relativePath = $_.FullName.Substring($PackageRoot.Length).TrimStart('\').Replace('\', '/')
            $hash = Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256

            $fileRows += [ordered]@{
                path   = $relativePath
                sha256 = $hash.Hash.ToLowerInvariant()
                size   = [int64]$_.Length
            }
        }

    $manifest = [ordered]@{
        packName    = $PackName
        packVersion = $PackVersion
        releaseDate = $ReleaseDate
        status      = $ReleaseStatus
        extensions  = $extensionRows
        files       = $fileRows
    }

    $manifestPath = Join-Path $PackageRoot 'manifest.json'
    $manifestJson = $manifest | ConvertTo-Json -Depth 8
    Set-Content -LiteralPath $manifestPath -Value $manifestJson -Encoding UTF8

    return $manifest
}

function Test-PackageContents {
    param([string]$PackageRoot)

    $manifestPath = Join-Path $PackageRoot 'manifest.json'
    Assert-File $manifestPath 'manifest.json'

    $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json

    if ([string]$manifest.packName -ne $PackName) {
        throw "Package name mismatch: $($manifest.packName)"
    }

    if ([string]$manifest.packVersion -ne $PackVersion) {
        throw "Package version mismatch: $($manifest.packVersion)"
    }

    foreach ($file in $manifest.files) {
        $relativePath = ([string]$file.path) -replace '/', '\'
        $fullPath = Join-Path $PackageRoot $relativePath

        if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
            throw "Package file is missing: $($file.path)"
        }

        $actualHash = (Get-FileHash -LiteralPath $fullPath -Algorithm SHA256).Hash.ToLowerInvariant()
        $expectedHash = ([string]$file.sha256).ToLowerInvariant()

        if ($actualHash -ne $expectedHash) {
            throw "Package hash mismatch: $($file.path)"
        }

        $actualSize = [int64](Get-Item -LiteralPath $fullPath).Length
        $expectedSize = [int64]$file.size

        if ($actualSize -ne $expectedSize) {
            throw "Package size mismatch: $($file.path)"
        }
    }

    return $manifest
}

function New-FlatReleaseZip {
    param([string]$SourceDirectory, [string]$DestinationZip)

    if (Test-Path -LiteralPath $DestinationZip) {
        Remove-Item -LiteralPath $DestinationZip -Force
    }

    Push-Location $SourceDirectory
    try {
        # Compress the contents of the staging folder, not the folder itself.
        # Therefore the ZIP root directly contains extensions, tools, install.bat, etc.
        Compress-Archive -Path * -DestinationPath $DestinationZip -CompressionLevel Optimal -Force
    }
    finally {
        Pop-Location
    }
}

function Test-ZipRootLayout {
    param([string]$ExtractedRoot)

    Assert-Directory (Join-Path $ExtractedRoot 'extensions') 'ZIP root extensions folder'
    Assert-Directory (Join-Path $ExtractedRoot 'tools') 'ZIP root tools folder'
    Assert-File (Join-Path $ExtractedRoot 'install.bat') 'ZIP root install.bat'
    Assert-File (Join-Path $ExtractedRoot 'manifest.json') 'ZIP root manifest.json'

    $nestedFolder = Join-Path $ExtractedRoot $FolderName
    if (Test-Path -LiteralPath $nestedFolder -PathType Container) {
        throw "The ZIP contains a duplicated top-level folder: $FolderName"
    }
}

Write-Host ''
Write-Host '============================================================'
Write-Host (" {0} Release Tool" -f $PackName)
Write-Host '============================================================'
Write-Host ("Version : {0}" -f $PackVersion)
Write-Host ("Date    : {0}" -f $ReleaseDate)
Write-Host ("Status  : {0}" -f $ReleaseStatus)
Write-Host ''

# Basic project validation.
Write-Step 'Checking the development project...'
Assert-Directory (Join-Path $SourceRoot 'extensions') 'source extensions folder'
Assert-Directory (Join-Path $SourceRoot 'tools') 'source tools folder'
Assert-File (Join-Path $SourceRoot 'install.bat') 'source install.bat'
Assert-File (Join-Path $SourceRoot 'tools\install.ps1') 'source tools\install.ps1'

# Recreate dist from scratch.
Write-Step 'Recreating the dist folder...'
Remove-Item -LiteralPath $DistRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $StageRoot -Force | Out-Null

# Do not copy development-only or generated files into the release package.
$excludedRootNames = @(
    '.git',
    '.github',
    '.gitignore',
    'dist',
    'manifest.json',
    'make_release.ps1',
    'install_result.txt',
    'uninstall_result.txt',
    'backup'
)

Write-Step 'Copying release files to the staging folder...'
Get-ChildItem -LiteralPath $SourceRoot -Force |
    Where-Object { $_.Name -notin $excludedRootNames } |
    ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination $StageRoot -Recurse -Force
    }

# Write release metadata before manifest hashing.
Write-Step 'Writing version information...'
$versionText = @(
    $PackName,
    "Version: v$PackVersion",
    "Release Date: $ReleaseDate",
    "Status: $ReleaseStatus"
) -join "`r`n"
Set-Content -LiteralPath (Join-Path $StageRoot 'VERSION.txt') -Value $versionText -Encoding UTF8

# Update the visible version in install.bat without modifying the development source.
$stagedInstallBat = Join-Path $StageRoot 'install.bat'
$batText = Get-Content -LiteralPath $stagedInstallBat -Raw
$batText = [regex]::Replace(
    $batText,
    'KidsBlock ESP32 Education Pack v[^\r\n]+',
    "KidsBlock ESP32 Education Pack v$PackVersion"
)
Set-Content -LiteralPath $stagedInstallBat -Value $batText -Encoding Default

# Create and verify manifest from final staged extension files.
Write-Step 'Generating manifest.json and SHA-256 hashes...'
$manifest = New-PackageManifest $StageRoot

Write-Step 'Verifying the staged package...'
$null = Test-PackageContents $StageRoot

# Build a flat ZIP using Windows PowerShell 5.1 standard Compress-Archive.
Write-Step 'Creating the flat release ZIP...'
New-FlatReleaseZip $StageRoot $ZipPath

# Verify the actual ZIP after extraction.
Write-Step 'Extracting and verifying the completed ZIP...'
Remove-Item -LiteralPath $VerifyRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $VerifyRoot -Force | Out-Null
Expand-Archive -LiteralPath $ZipPath -DestinationPath $VerifyRoot -Force

Test-ZipRootLayout $VerifyRoot
$verifiedManifest = Test-PackageContents $VerifyRoot

Remove-Item -LiteralPath $VerifyRoot -Recurse -Force

# Create a sidecar SHA-256 file for the complete ZIP.
Write-Step 'Creating the ZIP SHA-256 file...'
$zipHash = (Get-FileHash -LiteralPath $ZipPath -Algorithm SHA256).Hash.ToLowerInvariant()
$zipHashLine = "{0}  {1}" -f $zipHash, (Split-Path -Leaf $ZipPath)
Set-Content -LiteralPath $ZipHashPath -Value $zipHashLine -Encoding ASCII

Write-Host ''
Write-Host '============================================================'
Write-Host ' Release package created and verified successfully.'
Write-Host '============================================================'
Write-Host ("Version        : {0}" -f $PackVersion)
Write-Host ("Extensions     : {0}" -f $verifiedManifest.extensions.Count)
Write-Host ("Verified files : {0}" -f $verifiedManifest.files.Count)
Write-Host ("Release folder : {0}" -f $StageRoot)
Write-Host ("ZIP             : {0}" -f $ZipPath)
Write-Host ("ZIP SHA-256     : {0}" -f $zipHash)
Write-Host ''
Write-Host 'ZIP root layout:'
Write-Host '  extensions'
Write-Host '  tools'
Write-Host '  install.bat'
Write-Host '  manifest.json'
Write-Host '  README files, etc.'
Write-Host ''
