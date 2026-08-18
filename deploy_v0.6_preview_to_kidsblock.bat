@echo off
setlocal
title KidsBlock v0.6 Preview Deploy
set "ROOT=C:\KidsBlock-ESP32-Education-Pack\extensions\other"
set "DST=C:\Users\user\AppData\Roaming\KidsBlock\Data\external-resources\extensions\arduino\other"

echo ============================================================
echo KidsBlock ESP32 Education Pack - v0.6 Preview Deploy
echo author: davinichi
echo ============================================================
echo.
echo Close KidsBlock before continuing.
echo Current Git branch should be preview/v0.6.
echo.

if not exist "%ROOT%\environment\" (
 echo [ERROR] Missing source: %ROOT%\environment
 pause
 exit /b 1
)
if not exist "%ROOT%\bme280\" (
 echo [ERROR] Missing source: %ROOT%\bme280
 pause
 exit /b 1
)

choice /C YN /N /M "Deploy Environment and BME280? [Y/N]: "
if errorlevel 2 exit /b 0

if not exist "%DST%\environment\" mkdir "%DST%\environment"
if not exist "%DST%\bme280\" mkdir "%DST%\bme280"

echo.
echo [1/2] Environment
robocopy "%ROOT%\environment" "%DST%\environment" /E /COPY:DAT /DCOPY:DAT /R:2 /W:1
if errorlevel 8 (
 echo [ERROR] Environment deploy failed.
 pause
 exit /b 1
)

echo.
echo [2/2] BME280
robocopy "%ROOT%\bme280" "%DST%\bme280" /E /COPY:DAT /DCOPY:DAT /R:2 /W:1
if errorlevel 8 (
 echo [ERROR] BME280 deploy failed.
 pause
 exit /b 1
)

echo.
echo ============================================================
echo [OK] v0.6 Preview deployment completed.
echo ============================================================
echo Restart KidsBlock before testing.
pause
exit /b 0
