@echo off
title GHADA AI Super-App Launcher
echo ==========================================================
echo    GHADA -- Save First. Invest Second. Borrow Last.
echo    Designed ^& Developed by Surya Akhil
echo ==========================================================
echo.
echo Starting local application server...
cd /d "%~dp0"

start http://localhost:3000/

npx vite --port 3000
