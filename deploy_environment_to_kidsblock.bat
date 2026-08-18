@echo off
setlocal
title KidsBlock Environment Deploy
set "SOURCE=C:\KidsBlock-ESP32-Education-Pack\extensions\other\environment"
set "TARGET=C:\Users\user\AppData\Roaming\KidsBlock\Data\external-resources\extensions\arduino\other\environment"

echo ============================================================
echo   KidsBlock Environment Deploy
echo ============================================================
echo.
echo Source:
echo   %SOURCE%
echo Target:
echo   %TARGET%
echo.

if not exist "%SOURCE%\" (
  echo [ERROR] Source folder was not found:
  echo         %SOURCE%
  pause
  exit /b 1
)
if not exist "%TARGET%\" (
  echo [ERROR] Target folder was not found:
  echo         %TARGET%
  pause
  exit /b 1
)

echo Make sure KidsBlock is closed.
choice /C YN /N /M "Deploy Environment extension now? [Y/N]: "
if errorlevel 2 exit /b 0

robocopy "%SOURCE%" "%TARGET%" /E /COPY:DAT /DCOPY:DAT /R:2 /W:1
set "RC=%ERRORLEVEL%"
if %RC% GEQ 8 (
  echo [ERROR] Copy failed. Robocopy exit code: %RC%
  pause
  exit /b %RC%
)

echo.
echo [OK] Environment extension was deployed successfully.
echo Restart KidsBlock before testing.
pause
exit /b 0
