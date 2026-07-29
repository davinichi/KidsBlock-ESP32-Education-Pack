$source = "."
$dist = ".\dist\KidsBlock-ESP32-Education-Pack"

Remove-Item ".\dist" -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $dist -Force | Out-Null

Get-ChildItem $source -Force |
    Where-Object {
        $_.Name -notin @(
            ".git",
            "dist",
            "install_result.txt",
            "make_release.ps1"
        )
    } |
    Copy-Item -Destination $dist -Recurse -Force

Compress-Archive `
    -Path "$dist\*" `
    -DestinationPath ".\dist\KidsBlock-ESP32-Education-Pack-v0.1-Preview.zip" `
    -Force

Write-Host ""
Write-Host "Release package created successfully."
Write-Host "Output: .\dist\KidsBlock-ESP32-Education-Pack-v0.1-Preview.zip"