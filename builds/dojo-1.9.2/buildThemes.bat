@echo off
rem
rem BuildThemes.bat: compilação dos temas do Maestro
rem
rem Diretorio base: ..\dojo-1.9.2
rem

set current=%CD%

@echo "Removing release"
rmdir /Q/S release\themes

@echo "===== compiling claro theme"
cd %current%\src\dijit\themes\claro
@echo off
node compile.js

@echo "===== copying dojo files"
set dojo=%current%\themes\css\dojo

rmdir /Q/S %dojo%

rem pasta grid
xcopy /Y/E/I  %current%\src\dojox\grid\resources\*.* %dojo%\dojox\grid\resources\*.*

rem pasta icons
xcopy /Y/E/I  %current%\src\dijit\icons\*.* %dojo%\dijit\icons\*.*

rem pasta themes
echo f | xcopy /Y/E/I  %current%\src\dijit\themes\dijit.css %dojo%\dijit\themes\dijit.css
echo f | xcopy /Y/E/I  %current%\src\dijit\themes\dijit_rtl.css %dojo%\dijit\themes\dijit_rtl.css
xcopy /Y/E/I  %current%\src\dijit\themes\claro\*.* %dojo%\dijit\themes\claro\*.*

rem pasta dojo/resources
xcopy /Y/E/I  %current%\src\dojo\resources\*.* %dojo%\dojo\resources\*.*

@echo "===== compiling manager"
set manager=%current%\themes\css\manager
cd %manager%
@echo off
node compile.js

@echo "=== building default theme"
@echo "===== copying dojo/manager files"
rmdir /Q/S %current%\themes\default\css\dojo
rmdir /Q/S %current%\themes\default\css\manager
xcopy /Y/E/I  %dojo%\*.* %current%\themes\default\css\dojo
xcopy /Y/E/I  %manager%\*.* %current%\themes\default\css\manager

@echo "=== building siga-1.9.2 theme"
@echo "===== copying dojo files"
@echo "===== copying dojo/manager files"
rmdir /Q/S %current%\themes\siga-1.9.2\css\dojo
rmdir /Q/S %current%\themes\siga-1.9.2\css\manager
xcopy /Y/E/I  %dojo%\*.* %current%\themes\siga-1.9.2\css\dojo
xcopy /Y/E/I  %manager%\*.* %current%\themes\siga-1.9.2\css\manager

@echo "=== building themes"
@echo off
cd %current%\src\util\buildscripts\
call build profile=../../../themes.profile.js -r

cd %current%
@echo "=== Build themes complete"
