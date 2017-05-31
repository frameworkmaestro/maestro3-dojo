@echo off
rem
rem BuildThemes.bat: compilação dos temas do Maestro
rem
rem Diretorio base: ..\dojo-1.9.2
rem

set current=%CD%

@echo "=== building default theme"

@echo "===== copying dojo files"

set dojo=%CD%\themes\default\css\dojo

rem pasta grid
xcopy /Y/E/I  %current%\scripts\dojox\grid\resources\Grid.css %dojo%\dojox\grid\resources\Grid.css
xcopy /Y/E/I  %current%\scripts\dojox\grid\resources\Grid_rtl.css %dojo%\dojox\grid\resources\Grid_rtl.css
xcopy /Y/E/I  %current%\scripts\dojox\grid\resources\claroGrid.css %dojo%\dojox\grid\resources\claroGrid.css 
xcopy /Y/E/I  %current%\scripts\dojox\grid\resources\images\*.* %dojo%\dojox\grid\resources\images\*.*

rem pasta icons
xcopy /Y/E/I  %current%\scripts\dijit\icons\*.* %dojo%\dijit\icons\*.*
xcopy /Y/E/I  %current%\scripts\dijit\icons\images\*.* %dojo%\dijit\icons\images\*.*

rem pasta themes
xcopy /Y/E/I  %current%\scripts\dijit\themes\dijit.css %dojo%\dijit\themes\dijit.css
xcopy /Y/E/I  %current%\scripts\dijit\themes\dijit_rtl.css %dojo%\dijit\themes\dijit_rtl.css
xcopy /Y/E/I  %current%\scripts\dijit\themes\claro\*.* %dojo%\dijit\themes\claro\*.*

rem pasta dojo/resources
xcopy /Y/E/I  %current%\scripts\dojo\resources\*.* %dojo%\dojo\resources\*.*

@echo "===== compiling dojo"
cd %current%\scripts\dijit\themes\claro
@echo off
node compile.js

@echo "===== compiling manager"
cd %current%\themes\default\css\manager
@echo off
node compile.js

@echo "=== building themes"
@echo off
cd %current%\scripts\util\buildscripts\
call build profile=../../../themes.profile.js -r


cd %current%
@echo "=== Build themes complete"
