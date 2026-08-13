@echo off
setlocal EnableExtensions

rem ============================================================
rem KidsBlock ESP-NOW extension deploy script
rem Source: GitHub Desktop working folder
rem Target: KidsBlock AppData execution folder
rem ============================================================

set "REPO_ROOT=C:\KidsBlock-ESP32-Education-Pack"
set "SOURCE=%REPO_ROOT%\espnow_esp32"
set "TARGET=C:\Users\user\AppData\Roaming\KidsBlock\Data\external-resources\extensions\arduino\other\espnow_esp32"

echo.
echo ============================================================
echo   KidsBlock ESP-NOW Deploy
echo ============================================================
echo.

rem --- Check source folder ---
if not exist "%SOURCE%\" (
    echo [ERROR] Source folder was not found:
    echo         %SOURCE%
    echo.
    echo Please check the SOURCE setting in this BAT file.
    echo.
    pause
    exit /b 1
)

rem --- Show current Git branch if Git is available ---
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
echo This operation will make the target folder match the source folder.
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

rem --- Ensure target parent exists ---
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

rem --- Mirror source into target ---
robocopy "%SOURCE%" "%TARGET%" /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
set "RC=%ERRORLEVEL%"

rem Robocopy exit codes 0-7 are success/non-fatal
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
