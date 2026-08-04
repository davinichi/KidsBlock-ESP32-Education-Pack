param(
    [Parameter(Mandatory = $false)]
    [switch]$Quiet,

    [Parameter(Mandatory = $false)]
    [switch]$Json
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

if ($Quiet -and $Json) {
    Write-Error 'The -Quiet and -Json options cannot be used together.'
    exit 1
}

$ScriptRoot = $PSScriptRoot
$RepositoryRoot = Split-Path -Parent $ScriptRoot
$ReleaseJsonPath = Join-Path $RepositoryRoot 'release.json'
$VersionTextPath = Join-Path $RepositoryRoot 'VERSION.txt'
$ExtensionsRoot = Join-Path $RepositoryRoot 'extensions\other'

$Findings = New-Object 'System.Collections.Generic.List[object]'
$ExtensionResults = New-Object 'System.Collections.Generic.List[object]'

function Add-Finding {
    param(
        [ValidateSet('PASS', 'WARNING', 'FAIL')]
        [string]$Status,
        [string]$Code,
        [string]$Message
    )

    $Findings.Add([pscustomobject]@{
        status  = $Status
        code    = $Code
        message = $Message
    })
}

function Get-ObjectProperty {
    param(
        [object]$Object,
        [string]$Name
    )

    if ($null -eq $Object) {
        return $null
    }

    $property = $Object.PSObject.Properties[$Name]
    if ($null -eq $property) {
        return $null
    }

    return $property.Value
}

function Test-RequiredText {
    param(
        [object]$Object,
        [string]$PropertyName,
        [string]$DisplayName
    )

    $value = Get-ObjectProperty $Object $PropertyName
    if ($null -eq $value -or [string]::IsNullOrWhiteSpace([string]$value)) {
        Add-Finding 'FAIL' 'RELEASE_REQUIRED_PROPERTY' "release.json is missing or has an empty value for $DisplayName."
        return $null
    }

    Add-Finding 'PASS' 'RELEASE_REQUIRED_PROPERTY' "release.json contains $DisplayName."
    return [string]$value
}

function Get-RelativePath {
    param([string]$Path)

    return $Path.Substring($RepositoryRoot.Length).TrimStart('\').Replace('\', '/')
}

$releaseDocument = $null
$releasePack = $null
$packName = $null
$packVersion = $null
$packReleaseDate = $null
$packStatus = $null

if (-not (Test-Path -LiteralPath $ReleaseJsonPath -PathType Leaf)) {
    Add-Finding 'FAIL' 'RELEASE_FILE_MISSING' "release.json was not found: $ReleaseJsonPath"
}
else {
    try {
        $releaseDocument = Get-Content -LiteralPath $ReleaseJsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
        Add-Finding 'PASS' 'RELEASE_JSON_SYNTAX' 'release.json contains valid JSON.'
    }
    catch {
        Add-Finding 'FAIL' 'RELEASE_JSON_SYNTAX' "release.json is not valid JSON: $($_.Exception.Message)"
    }
}

if ($null -ne $releaseDocument) {
    $schemaVersion = Get-ObjectProperty $releaseDocument 'schemaVersion'
    if ($null -eq $schemaVersion) {
        Add-Finding 'FAIL' 'RELEASE_SCHEMA_REQUIRED' 'release.json is missing schemaVersion.'
    }
    elseif ([string]$schemaVersion -ne '1') {
        Add-Finding 'FAIL' 'RELEASE_SCHEMA_UNSUPPORTED' "release.json schemaVersion must be 1; found '$schemaVersion'."
    }
    else {
        Add-Finding 'PASS' 'RELEASE_SCHEMA' 'release.json schemaVersion is 1.'
    }

    $releasePack = Get-ObjectProperty $releaseDocument 'pack'
    if ($null -eq $releasePack) {
        Add-Finding 'FAIL' 'RELEASE_PACK_REQUIRED' 'release.json is missing pack.'
    }
    else {
        Add-Finding 'PASS' 'RELEASE_PACK' 'release.json contains pack.'
        $packName = Test-RequiredText $releasePack 'name' 'pack.name'
        $packVersion = Test-RequiredText $releasePack 'version' 'pack.version'
        $packReleaseDate = Test-RequiredText $releasePack 'releaseDate' 'pack.releaseDate'
        $packStatus = Test-RequiredText $releasePack 'status' 'pack.status'

        if ($null -ne $packReleaseDate) {
            if ($packReleaseDate -match '^\d{4}-\d{2}-\d{2}$') {
                Add-Finding 'PASS' 'RELEASE_DATE_FORMAT' 'release.json pack.releaseDate uses YYYY-MM-DD format.'
            }
            else {
                Add-Finding 'FAIL' 'RELEASE_DATE_FORMAT' "release.json pack.releaseDate must use YYYY-MM-DD format; found '$packReleaseDate'."
            }
        }
    }
}

$versionValues = [ordered]@{
    Version       = $null
    'Release Date' = $null
    Status        = $null
    Extensions    = $null
}

if (-not (Test-Path -LiteralPath $VersionTextPath -PathType Leaf)) {
    Add-Finding 'FAIL' 'VERSION_FILE_MISSING' "VERSION.txt was not found: $VersionTextPath"
}
else {
    try {
        foreach ($line in Get-Content -LiteralPath $VersionTextPath -Encoding UTF8) {
            if ($line -match '^\s*([^:]+):\s*(.*?)\s*$') {
                $key = $matches[1].Trim()
                if ($versionValues.Contains($key)) {
                    $versionValues[$key] = $matches[2].Trim()
                }
            }
        }
        Add-Finding 'PASS' 'VERSION_FILE_READ' 'VERSION.txt was read successfully.'
    }
    catch {
        Add-Finding 'FAIL' 'VERSION_FILE_READ' "VERSION.txt could not be read: $($_.Exception.Message)"
    }
}

foreach ($requiredVersionKey in @('Version', 'Release Date', 'Status', 'Extensions')) {
    if ([string]::IsNullOrWhiteSpace([string]$versionValues[$requiredVersionKey])) {
        Add-Finding 'FAIL' 'VERSION_REQUIRED_FIELD' "VERSION.txt is missing $requiredVersionKey."
    }
}

if ($null -ne $packVersion -and -not [string]::IsNullOrWhiteSpace([string]$versionValues.Version)) {
    if ([string]$versionValues.Version -eq $packVersion) {
        Add-Finding 'PASS' 'VERSION_PACK_VERSION' 'VERSION.txt Version matches release.json.'
    }
    else {
        Add-Finding 'FAIL' 'VERSION_PACK_VERSION' "VERSION.txt Version '$($versionValues.Version)' does not match release.json '$packVersion'."
    }
}

if ($null -ne $packStatus -and -not [string]::IsNullOrWhiteSpace([string]$versionValues.Status)) {
    if ([string]$versionValues.Status -eq $packStatus) {
        Add-Finding 'PASS' 'VERSION_PACK_STATUS' 'VERSION.txt Status matches release.json.'
    }
    else {
        Add-Finding 'FAIL' 'VERSION_PACK_STATUS' "VERSION.txt Status '$($versionValues.Status)' does not match release.json '$packStatus'."
    }
}

if ($null -ne $packReleaseDate -and -not [string]::IsNullOrWhiteSpace([string]$versionValues.'Release Date')) {
    $versionReleaseDate = [string]$versionValues.'Release Date'
    if ($versionReleaseDate -eq $packReleaseDate) {
        Add-Finding 'PASS' 'VERSION_RELEASE_DATE' 'VERSION.txt Release Date matches release.json.'
    }
    elseif ($versionReleaseDate -match '^\d{4}-\d{2}$' -and $packReleaseDate.StartsWith("$versionReleaseDate-")) {
        Add-Finding 'WARNING' 'VERSION_RELEASE_DATE_PRECISION' "VERSION.txt Release Date '$versionReleaseDate' matches the year and month of release.json '$packReleaseDate', but omits the day."
    }
    else {
        Add-Finding 'FAIL' 'VERSION_RELEASE_DATE' "VERSION.txt Release Date '$versionReleaseDate' does not match release.json '$packReleaseDate'."
    }
}

$extensionDirectories = @()
if (-not (Test-Path -LiteralPath $ExtensionsRoot -PathType Container)) {
    Add-Finding 'FAIL' 'EXTENSIONS_FOLDER_MISSING' "Extensions folder was not found: $ExtensionsRoot"
}
else {
    $extensionDirectories = @(Get-ChildItem -LiteralPath $ExtensionsRoot -Directory |
        Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'index.js') -PathType Leaf } |
        Sort-Object Name)
    Add-Finding 'PASS' 'EXTENSIONS_DISCOVERED' "Discovered $($extensionDirectories.Count) extensions."
}

$extensionCount = $extensionDirectories.Count
if (-not [string]::IsNullOrWhiteSpace([string]$versionValues.Extensions)) {
    $declaredExtensionCount = 0
    if (-not [int]::TryParse([string]$versionValues.Extensions, [ref]$declaredExtensionCount)) {
        Add-Finding 'FAIL' 'VERSION_EXTENSION_COUNT_FORMAT' "VERSION.txt Extensions must be an integer; found '$($versionValues.Extensions)'."
    }
    elseif ($declaredExtensionCount -eq $extensionCount) {
        Add-Finding 'PASS' 'VERSION_EXTENSION_COUNT' "VERSION.txt Extensions matches the detected count ($extensionCount)."
    }
    else {
        Add-Finding 'FAIL' 'VERSION_EXTENSION_COUNT' "VERSION.txt Extensions '$declaredExtensionCount' does not match the detected count '$extensionCount'."
    }
}

$semVerPattern = '^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$'

foreach ($extensionDirectory in $extensionDirectories) {
    $indexPath = Join-Path $extensionDirectory.FullName 'index.js'
    $indexText = Get-Content -LiteralPath $indexPath -Raw -Encoding UTF8
    $displayMatch = [regex]::Match($indexText, 'default\s*:\s*[''\"]([^''\"]+)[''\"]')
    $versionMatch = [regex]::Match($indexText, 'version\s*:\s*[''\"]([^''\"]+)[''\"]')
    $displayName = if ($displayMatch.Success) { $displayMatch.Groups[1].Value } else { $extensionDirectory.Name }
    $indexVersion = if ($versionMatch.Success) { $versionMatch.Groups[1].Value } else { $null }
    $semVerResult = 'FAIL'

    if ($null -eq $indexVersion) {
        Add-Finding 'FAIL' 'EXTENSION_VERSION_MISSING' "$($extensionDirectory.Name)/index.js is missing version."
    }
    elseif ($indexVersion -notmatch $semVerPattern) {
        Add-Finding 'FAIL' 'EXTENSION_VERSION_SEMVER' "$($extensionDirectory.Name)/index.js version '$indexVersion' is not valid SemVer."
    }
    else {
        $semVerResult = 'PASS'
        Add-Finding 'PASS' 'EXTENSION_VERSION_SEMVER' "$($extensionDirectory.Name)/index.js version '$indexVersion' is valid SemVer."
    }

    $libraryResults = New-Object 'System.Collections.Generic.List[object]'
    $libraryRoot = Join-Path $extensionDirectory.FullName 'lib'
    $libraryPropertiesFiles = @()
    if (Test-Path -LiteralPath $libraryRoot -PathType Container) {
        $libraryPropertiesFiles = @(Get-ChildItem -LiteralPath $libraryRoot -File -Recurse -Filter 'library.properties' | Sort-Object FullName)
    }

    if ($libraryPropertiesFiles.Count -eq 0) {
        Add-Finding 'PASS' 'EXTENSION_LIBRARY_NOT_REQUIRED' "$($extensionDirectory.Name) has no library.properties; this is valid."
    }
    else {
        foreach ($libraryPropertiesFile in $libraryPropertiesFiles) {
            $libraryVersion = $null
            foreach ($line in Get-Content -LiteralPath $libraryPropertiesFile.FullName -Encoding UTF8) {
                if ($line -match '^\s*version\s*=\s*(.*?)\s*$') {
                    $libraryVersion = $matches[1].Trim()
                    break
                }
            }

            $relativeLibraryPath = Get-RelativePath $libraryPropertiesFile.FullName
            $libraryResult = 'FAIL'
            if ([string]::IsNullOrWhiteSpace([string]$libraryVersion)) {
                Add-Finding 'FAIL' 'LIBRARY_VERSION_MISSING' "$relativeLibraryPath is missing version."
            }
            elseif ($null -eq $indexVersion -or $libraryVersion -ne $indexVersion) {
                Add-Finding 'FAIL' 'LIBRARY_VERSION_MISMATCH' "$relativeLibraryPath version '$libraryVersion' does not match index.js '$indexVersion'."
            }
            else {
                $libraryResult = 'PASS'
                Add-Finding 'PASS' 'LIBRARY_VERSION_MATCH' "$relativeLibraryPath version matches index.js ($indexVersion)."
            }

            $libraryResults.Add([pscustomobject]@{
                path    = $relativeLibraryPath
                version = $libraryVersion
                result  = $libraryResult
            })
        }
    }

    $ExtensionResults.Add([pscustomobject]@{
        folder      = $extensionDirectory.Name
        displayName = $displayName
        version     = $indexVersion
        semVer      = $semVerResult
        libraries   = $libraryResults.ToArray()
    })
}

# Future work: explicitly registered version strings embedded in generated C++
# or library source may be checked here. Automatic source scanning is intentionally
# excluded because diagnostic labels, protocol identifiers, and history text need
# different versioning rules.

$passCount = @($Findings | Where-Object status -eq 'PASS').Count
$warningCount = @($Findings | Where-Object status -eq 'WARNING').Count
$failCount = @($Findings | Where-Object status -eq 'FAIL').Count
$finalResult = if ($failCount -eq 0) { 'PASS' } else { 'FAIL' }

$resultObject = [ordered]@{
    result       = $finalResult
    passCount    = $passCount
    warningCount = $warningCount
    failCount    = $failCount
    pack         = [ordered]@{
        releaseJson = [ordered]@{
            name        = $packName
            version     = $packVersion
            releaseDate = $packReleaseDate
            status      = $packStatus
        }
        versionTxt = [ordered]@{
            version       = $versionValues.Version
            releaseDate   = $versionValues.'Release Date'
            status        = $versionValues.Status
            extensions    = $versionValues.Extensions
            detectedCount = $extensionCount
        }
    }
    extensions   = $ExtensionResults.ToArray()
    findings     = $Findings.ToArray()
}

if ($Json) {
    $resultObject | ConvertTo-Json -Depth 10
}
elseif ($Quiet) {
    foreach ($finding in $Findings | Where-Object status -eq 'FAIL') {
        Write-Host ("[FAIL] {0}" -f $finding.message)
    }
    Write-Host ("Result: {0}  PASS: {1}  WARNING: {2}  FAIL: {3}" -f $finalResult, $passCount, $warningCount, $failCount)
}
else {
    Write-Host ''
    Write-Host 'KidsBlock ESP32 Education Pack - Version Check'
    Write-Host '================================================'
    Write-Host ''
    Write-Host 'Pack information (release.json)'
    Write-Host ("  Name         : {0}" -f $packName)
    Write-Host ("  Version      : {0}" -f $packVersion)
    Write-Host ("  Release Date : {0}" -f $packReleaseDate)
    Write-Host ("  Status       : {0}" -f $packStatus)
    Write-Host ''
    Write-Host 'VERSION.txt'
    Write-Host ("  Version      : {0}" -f $versionValues.Version)
    Write-Host ("  Release Date : {0}" -f $versionValues.'Release Date')
    Write-Host ("  Status       : {0}" -f $versionValues.Status)
    Write-Host ("  Extensions   : {0} (detected: {1})" -f $versionValues.Extensions, $extensionCount)
    Write-Host ''
    Write-Host 'Extensions'
    $ExtensionResults |
        Select-Object folder, displayName, version, semVer, @{Name='libraries';Expression={
            if ($_.libraries.Count -eq 0) { 'none (valid)' }
            else { ($_.libraries | ForEach-Object { "{0}: {1}" -f $_.result, $_.path }) -join '; ' }
        }} |
        Format-Table -AutoSize

    $warningsAndFailures = @($Findings | Where-Object { $_.status -ne 'PASS' })
    if ($warningsAndFailures.Count -gt 0) {
        Write-Host 'Warnings and failures'
        foreach ($finding in $warningsAndFailures) {
            Write-Host ("  [{0}] {1}" -f $finding.status, $finding.message)
        }
        Write-Host ''
    }

    Write-Host ("Result: {0}  PASS: {1}  WARNING: {2}  FAIL: {3}" -f $finalResult, $passCount, $warningCount, $failCount)
}

if ($failCount -eq 0) {
    exit 0
}

exit 1
