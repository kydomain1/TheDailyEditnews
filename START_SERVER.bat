@echo off
echo Starting local web server for TheDailyEditnews...
echo.
echo The website will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000

if errorlevel 1 (
    echo.
    echo Python not found. Trying alternative method...
    echo.
    php -S localhost:8000
)

if errorlevel 1 (
    echo.
    echo Neither Python nor PHP found.
    echo Please install Python 3 or PHP to run a local server.
    echo.
    echo Alternatively, you can use VS Code's Live Server extension
    echo or any other local web server.
    pause
)




