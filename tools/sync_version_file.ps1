param(
    [Parameter(Mandatory = $false)]
    [switch]$Check,

    [Parameter(Mandatory = $false)]
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

function Read-ReleaseConfiguration {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "release.json was not found: $Path"
    }

    try {
        $release = Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json
    }
    catch {
        throw "release.json is not valid JSON: $($_.Exception.Message)"
    }

    $schemaProperty = $release.PSObject.Properties['schemaVersion']
    if ($null -eq $schemaProperty) {
        throw 'release.json is missing required property: schemaVersion'
    }
    if ([string]$schemaProperty.Value -ne '1') {
        throw "release.json schemaVersion must be 1; found '$($schemaProperty.Value)'."
    }

    $packProperty = $release.PSObject.Properties['pack']
    if ($null -eq $packProperty -or $null -eq $packProperty.Value) {
        throw 'release.json is missing required property: pack'
    }

    $pack = $packProperty.Value
    $values = [ordered]@{}
    foreach ($propertyName in @('name', 'version', 'releaseDate', 'status')) {
        $property = $pack.PSObject.Properties[$propertyName]
        if ($null -eq $property -or [string]::IsNullOrWhiteSpace([string]$property.Value)) {
            throw "release.json is missing or has an empty value for pack.$propertyName"
        }
        $values[$propertyName] = [string]$property.Value
    }

    if ($values.releaseDate -notmatch '^\d{4}-\d{2}-\d{2}$') {
        throw "release.json pack.releaseDate must use YYYY-MM-DD format; found '$($values.releaseDate)'."
    }

    return [pscustomobject]@{
        Name        = $values.name
        Version     = $values.version
        ReleaseDate = $values.releaseDate
        Status      = $values.status
    }
}

function Get-LineEnding {
    param([string]$CurrentText)

    if ($CurrentText.Contains("`r`n")) {
        return [pscustomobject]@{ Name = 'CRLF'; Value = "`r`n" }
    }
    if ($CurrentText.Contains("`n")) {
        return [pscustomobject]@{ Name = 'LF'; Value = "`n" }
    }

    return [pscustomobject]@{ Name = 'CRLF'; Value = "`r`n" }
}

function Show-ContentDifference {
    param(
        [string]$CurrentText,
        [string]$ExpectedText
    )

    $currentLines = @($CurrentText -split '\r?\n')
    $expectedLines = @($ExpectedText -split '\r?\n')
    $maximumLines = [Math]::Max($currentLines.Count, $expectedLines.Count)

    Write-Host 'Differences (current -> expected):'
    for ($index = 0; $index -lt $maximumLines; $index++) {
        $currentLine = if ($index -lt $currentLines.Count) { $currentLines[$index] } else { '<missing>' }
        $expectedLine = if ($index -lt $expectedLines.Count) { $expectedLines[$index] } else { '<missing>' }
        if ($currentLine -ne $expectedLine) {
            Write-Host ("  Line {0}" -f ($index + 1))
            Write-Host ("    - {0}" -f $currentLine)
            Write-Host ("    + {0}" -f $expectedLine)
        }
    }
}

try {
    if ($Check -and $Apply) {
        throw 'The -Check and -Apply options cannot be used together.'
    }

    $mode = if ($Apply) { 'Apply' } else { 'Check' }
    $scriptRoot = $PSScriptRoot
    $repositoryRoot = Split-Path -Parent $scriptRoot
    $releaseJsonPath = Join-Path $repositoryRoot 'release.json'
    $versionTextPath = Join-Path $repositoryRoot 'VERSION.txt'
    $extensionsRoot = Join-Path $repositoryRoot 'extensions\other'

    $configuration = Read-ReleaseConfiguration $releaseJsonPath

    if (-not (Test-Path -LiteralPath $extensionsRoot -PathType Container)) {
        throw "Extensions folder was not found: $extensionsRoot"
    }

    $extensionDirectories = @(Get-ChildItem -LiteralPath $extensionsRoot -Directory |
        Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'index.js') -PathType Leaf } |
        Sort-Object Name)

    if ($extensionDirectories.Count -eq 0) {
        throw "No extensions with index.js were found under: $extensionsRoot"
    }

    if (-not (Test-Path -LiteralPath $versionTextPath -PathType Leaf)) {
        throw "VERSION.txt was not found: $versionTextPath"
    }

    $currentText = [IO.File]::ReadAllText($versionTextPath)
    $lineEnding = Get-LineEnding $currentText
    $expectedLines = @(
        $configuration.Name,
        "Version: $($configuration.Version)",
        "Status: $($configuration.Status)",
        "Release Date: $($configuration.ReleaseDate)",
        "Extensions: $($extensionDirectories.Count)"
    )
    $expectedText = ($expectedLines -join $lineEnding.Value) + $lineEnding.Value
    $matches = $currentText -ceq $expectedText
    $changed = $false

    Write-Host ''
    Write-Host 'KidsBlock ESP32 Education Pack - VERSION.txt Sync'
    Write-Host '================================================'
    Write-Host ("Mode         : {0}" -f $mode)
    Write-Host ("Pack Version : {0}" -f $configuration.Version)
    Write-Host ("Release Date : {0}" -f $configuration.ReleaseDate)
    Write-Host ("Status       : {0}" -f $configuration.Status)
    Write-Host ("Extensions   : {0}" -f $extensionDirectories.Count)
    Write-Host ("Line Ending  : {0}" -f $lineEnding.Name)
    Write-Host ''

    if ($matches) {
        Write-Host 'VERSION.txt : MATCH'
        Write-Host 'Rewritten   : NO'
        Write-Host 'Result      : PASS'
        exit 0
    }

    Show-ContentDifference $currentText $expectedText

    if ($mode -eq 'Check') {
        Write-Host ''
        Write-Host 'VERSION.txt : MISMATCH'
        Write-Host 'Rewritten   : NO'
        Write-Host 'Result      : FAIL'
        exit 1
    }

    $utf8WithoutBom = New-Object Text.UTF8Encoding($false)
    [IO.File]::WriteAllText($versionTextPath, $expectedText, $utf8WithoutBom)
    $changed = $true

    $writtenText = [IO.File]::ReadAllText($versionTextPath)
    if ($writtenText -cne $expectedText) {
        throw 'VERSION.txt verification failed after writing.'
    }

    $writtenBytes = [IO.File]::ReadAllBytes($versionTextPath)
    $hasUtf8Bom = $writtenBytes.Length -ge 3 -and
        $writtenBytes[0] -eq 0xEF -and
        $writtenBytes[1] -eq 0xBB -and
        $writtenBytes[2] -eq 0xBF
    if ($hasUtf8Bom) {
        throw 'VERSION.txt verification failed: UTF-8 BOM was written.'
    }

    Write-Host ''
    Write-Host 'VERSION.txt : MATCH'
    Write-Host ("Rewritten   : {0}" -f $(if ($changed) { 'YES' } else { 'NO' }))
    Write-Host 'Result      : PASS'
    exit 0
}
catch {
    Write-Host ''
    Write-Host ("[FAIL] {0}" -f $_.Exception.Message)
    Write-Host 'Result      : FAIL'
    exit 1
}
