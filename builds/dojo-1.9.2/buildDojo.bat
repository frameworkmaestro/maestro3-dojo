@echo off
rem
rem BuildDojo.bat: compilação do Dojo
rem
rem Diretorio base: ..\dojo-1.9.2
rem

set current=%CD%

@echo "building Dojo scripts"
cd %current%\scripts\util\buildscripts\

@echo "building Dojo"
@echo off
call build profile=../../../dojo.profile.js -r > output.txt

cd %current%\release\scripts\dojo
del /s *.js.map > nul
del /s *.uncompressed.js > nul

cd %current%
@echo "Build Dojo scripts complete"
