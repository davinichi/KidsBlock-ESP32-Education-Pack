@echo off
setlocal
cd /d "%~dp0"

cls
echo ============================================================
echo  KidsBlock ESP32 Education Pack v0.5 Preview
echo ============================================================
echo.
echo IMPORTANT NOTICE
echo.
echo This package is a preview release before Version 1.0.
echo It has been tested, but correct operation is not guaranteed on
echo every PC, KidsBlock installation, ESP32 board, peripheral,
echo network, or external service.
echo.
echo The author is not responsible for damage, malfunction, or loss
echo involving the PC, KidsBlock, development environment, programs,
echo saved data, ESP32 boards, connected devices, or other systems.
echo.
echo Back up important programs and data before installation.
echo Read LICENSE_JA.md before continuing.
echo.
echo By entering Y and continuing, you agree to the license terms and
echo disclaimer in LICENSE_JA.md.
echo.

if not exist "%~dp0LICENSE_JA.md" (
  echo ERROR: LICENSE_JA.md was not found.
  echo Installation was not started.
  echo.
  pause
  exit /b 1
)

set "ANSWER="
set /p "ANSWER=Do you accept the license and continue? [Y/N]: "

if /I not "%ANSWER%"=="Y" (
  echo.
  echo Installation cancelled. No files were copied.
  echo.
  pause
  exit /b 2
)

echo.
echo License accepted. Starting installation...
echo.

%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\install.ps1"
set "ERR=%ERRORLEVEL%"

echo.
if not "%ERR%"=="0" (
  echo Installation failed.
  echo See install_result.txt for details.
) else (
  echo Installation completed successfully.
)
echo.
pause
exit /b %ERR%
