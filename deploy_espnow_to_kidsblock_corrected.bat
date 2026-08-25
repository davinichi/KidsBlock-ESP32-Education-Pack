@echo off
setlocal EnableExtensions

set "REPO_ROOT=C:\KidsBlock-ESP32-Education-Pack"
set "SOURCE=%REPO_ROOT%\extensions\other\espnow_esp32"
set "TARGET=C:\Users\user\AppData\Roaming\KidsBlock\Data\external-resources\extensions\arduino\other\espnow_esp32"

echo.
echo ============================================================
echo   KidsBlock ESP-NOW Deploy

echo ============================================================
echo.

if not exist "%SOURCE%\" (
    echo [ERROR] Source folder was not found:
    echo         %SOURCE%
    echo.
    pause
    exit /b 1
)

set "BRANCH=unknown"
where git >nul 2>&1
if %errorlevel%==0 (
    for /f "delims=" %%B in ('git -C "%REPO_ROOT%" branch --show-current 2^>nul') do set "BRANCH=%%B"
)

echo Current Git branch : %BRANCH%
echo.
echo Source:
echo   %SOURCE%
echo.
echo Target:
echo   %TARGET%
echo.
echo The target ESP-NOW extension folder will be mirrored from the source.
echo Files that exist only in the target may be deleted.
echo.
choice /C YN /N /M "Deploy this version to KidsBlock? [Y/N]: "
if errorlevel 2 (
    echo.
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo Deploying...
echo.

if not exist "%TARGET%" (
    mkdir "%TARGET%" >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Could not create target folder.
        echo         %TARGET%
        echo.
        pause
        exit /b 1
    )
)

robocopy "%SOURCE%" "%TARGET%" /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
set "RC=%ERRORLEVEL%"

if %RC% GEQ 8 (
    echo.
    echo [ERROR] Deployment failed. Robocopy exit code: %RC%
    echo.
    pause
    exit /b %RC%
)

echo.
echo ============================================================
echo   Deployment completed successfully.
echo   Git branch: %BRANCH%
echo ============================================================
echo.
echo Restart KidsBlock before testing the extension.
echo.
pause
exit /b 0
