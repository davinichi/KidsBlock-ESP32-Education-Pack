@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo  KidsBlock ESP32 Education Pack v0.3 Preview
echo ================================================
echo.
echo Close KidsBlock before installation.
echo.
%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\install.ps1"
set "ERR=%ERRORLEVEL%"
echo.
if not "%ERR%"=="0" (
  echo Installation failed.
  echo See install_result.txt for details.
) else (
  echo Installation completed successfully.
  echo Start KidsBlock and check the Other category.
)
echo.
pause
exit /b %ERR%
