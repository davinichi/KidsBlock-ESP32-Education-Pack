@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo  KidsBlock ESP32 Education Pack Uninstaller
echo ================================================
echo.
echo Close KidsBlock before uninstalling.
echo.
%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\uninstall.ps1"
set "ERR=%ERRORLEVEL%"
echo.
if not "%ERR%"=="0" (
  echo Uninstallation failed.
  echo See uninstall_result.txt for details.
) else (
  echo Uninstallation completed successfully.
  echo Previous extensions were restored when backups existed.
)
echo.
pause
exit /b %ERR%
