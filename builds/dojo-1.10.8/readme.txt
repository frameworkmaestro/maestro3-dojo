===
Maestro/DOJO - Custom Build (Windows)
===
--
Requisitos
--

* Java
* Dojo source 1.10.8: http://download.dojotoolkit.org (ex. dojo-release-1.10.8-src.zip)
* Node http://nodejs.org (ex. node-v0.8.8-x64.msi)

. Instalar nodejs

--
Estrutura de diretórios usada no projeto
--

. Abrir o source do Dojo (dojo-release-1.10.8-src) em uma pasta temporária
. Do source do Dojo, copiar as pastas "dojo", "dijit", "dojox" e "util" para a pasta "dojo-1.10.8\src"
. A estrutura da pasta "dojo-1.10.8" deve estar assim:

├── builds\dojo-1.10.8
│   ├── src 
│   │   ├── dgrid  (scripts do DGrid, que usa o Dojo)
│   │   ├── xstyle
│   │   ├── jquery
│   │   ├── json
│   │   ├── put-selector
│   │   ├── manager (scripts do Maestro)
│   │   ├── dijit (scripts da distribuição do Dojo)
│   │   ├── dojo (scripts da distribuição do Dojo)
│   │   ├── dojox (scripts da distribuição do Dojo)
│   │   └── util (scripts da distribuição do Dojo)
│   ├── themes (tema "default" e os demais a serem compilados)
│   │   └── default
│   │	    ├── css
│   │	    ├── scripts
│   │       └── *.* (varios arquivos do tema)
│   ├── resources 
│   │   └── icons (várias distribuições de icones)
│   ├── release (será preenchida após o build)
│   │   ├── scripts
│   │   └── themes
│   ├── dist (será preenchida após o build)
│   │   ├── scripts
│   │   └── themes
│   ├── buildDojo.bat
│   ├── buildThemes.bat
│   ├── dojo.profile.js   (usado na compilação do Dojo)
│   ├── themes.profile.js (usado na compilação dos Temas)
│   └── readme.txt   (este arquivo)

---
Para compilar Dojo/Manager
. os arquivos compilados estão na pasta release/scripts
. os arquivos a serem copiados para o tema estão na pasta dist/scripts
---
buildDojo.bat

---
Para compilar os temas
. os arquivos para o tema são criados na pasta release/themes
---
buildThemes.bat
