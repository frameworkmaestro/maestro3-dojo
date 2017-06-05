@echo off
rem
rem BuildDojo.bat: compilação do Dojo
rem
rem Diretorio base: ..\dojo-1.10.8
rem

set current=%CD%

@echo "Removing release"
rmdir /Q/S release\scripts

@echo "building Dojo scripts"
cd %current%\src\util\buildscripts\

@echo "building Dojo"
@echo off
call build profile=../../../dojo.profile.js -r > output.txt

cd %current%\release\scripts\dojo
del /s *.js.map > nul
del /s *.uncompressed.js > nul

cd %current%
@echo "Build Dojo scripts complete"

@echo "Copying to dist"
rmdir /Q/S dist\scripts
echo f | xcopy /Y/E/I release\scripts\manager\main.js dist\scripts\manager\main.js
echo f | xcopy /Y/E/I release\scripts\manager\dijit.js dist\scripts\manager\dijit.js
echo f | xcopy /Y/E/I release\scripts\manager\dojox.js dist\scripts\manager\dojox.js
xcopy /Y/E/I release\scripts\manager\resources\*.* dist\scripts\manager\resources\*.*
echo f | xcopy /Y/E/I release\scripts\dojo\dojo.js dist\scripts\dojo\dojo.js
xcopy /Y/E/I release\scripts\dojo\resources\*.* dist\scripts\dojo\resources\*.*

