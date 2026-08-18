@echo off
setlocal
title KidsBlock BME280 Deploy

set "SOURCE=C:\KidsBlock-ESP32-Education-Pack\extensions\other\bme280"
set "TARGET=C:\Users\user\AppData\Roaming\KidsBlock\Data\external-resources\extensions\arduino\other\bme280"

echo ============================================================
echo   KidsBlock BME280 Deploy
echo ============================================================
echo.
echo Source:
echo   %SOURCE%
echo.
echo Target:
echo   %TARGET%
echo.

if not exist "%SOURCE%\" (
    echo [ERROR] Source folder was not found:
    echo         %SOURCE%
    echo.
    pause
    exit /b 1
)

if not exist "%TARGET%\" (
    echo Target folder does not exist yet.
    echo Creating:
    echo   %TARGET%
    echo.
    mkdir "%TARGET%"
    if errorlevel 1 (
        echo [ERROR] Could not create the target folder.
        pause
        exit /b 1
    )
)

echo Make sure KidsBlock is closed before continuing.
echo.
choice /C YN /N /M "Deploy BME280 extension now? [Y/N]: "
if errorlevel 2 (
    echo.
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo Copying files...
robocopy "%SOURCE%" "%TARGET%" /E /COPY:DAT /DCOPY:DAT /R:2 /W:1

set "RC=%ERRORLEVEL%"
if %RC% GEQ 8 (
    echo.
    echo [ERROR] Copy failed. Robocopy exit code: %RC%
    echo.
    pause
    exit /b %RC%
)

echo.
echo ============================================================
echo   Deploy completed successfully.
echo ============================================================
echo.
echo Restart KidsBlock before testing the BME280 extension.
echo.
pause
exit /b 0
