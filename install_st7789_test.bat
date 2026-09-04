@echo off
setlocal
chcp 65001 >nul

echo ============================================================
echo  KidsBlock ESP32 Education Pack - ST7789 Test Installer
echo  Development target: preview/v0.7
echo ============================================================
echo.
echo Please close KidsBlock Desktop before installation.
echo.

set "SRC=%~dp0extensions\other\st7789_esp32"
set "BASE=%APPDATA%\KidsBlock\Data\external-resources\extensions\arduino\other"
set "DST=%BASE%\st7789_esp32"

if not exist "%SRC%\index.js" (
  echo [ERROR] Source extension was not found:
  echo         %SRC%
  pause
  exit /b 1
)

if not exist "%BASE%" (
  echo [ERROR] KidsBlock external-resources folder was not found:
  echo         %BASE%
  echo Please start KidsBlock Desktop at least once, then close it and retry.
  pause
  exit /b 1
)

if exist "%DST%" (
  echo [INFO] Removing previous ST7789 test extension...
  rmdir /s /q "%DST%"
)

echo [INFO] Installing ST7789 test extension...
xcopy "%SRC%" "%DST%\" /E /I /Y >nul
if errorlevel 1 (
  echo [ERROR] Copy failed.
  pause
  exit /b 1
)

echo.
echo [OK] Installation completed.
echo Installed to:
echo %DST%
echo.
echo Restart KidsBlock Desktop and select the ST7789 TFT extension.
echo.
pause
endlocal
