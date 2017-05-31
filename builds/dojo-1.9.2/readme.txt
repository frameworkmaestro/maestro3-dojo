===
Maestro/DOJO - Custom Build (Windows)
===
--
Requisitos
--

* Java
* Dojo source 1.9.2: http://download.dojotoolkit.org (ex. dojo-release-1.9.2-src.zip)
* Node http://nodejs.org (ex. node-v0.8.8-x64.msi)

. Instalar nodejs

--
Estrutura de diretórios usada no projeto
--

. Abrir o source do Dojo (dojo-release-1.9.2-src) em uma pasta temporária
. Do source do Dojo, copiar as pastas "dojo", "dijit", "dojox" e "util" para a pasta "dojo-1.9.2\scripts"
. A estrutura da pasta "dojo-1.9.2" deve estar assim:

├── maestro_dev\source\js_themes\dojo-1.9.2
│   ├── scripts 
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
│   ├── resource 
│   │   └── icons (várias distribuições de icones)
│   ├── release (será preenchida após o build)
│   │   ├── scripts
│   │   └── themes
│   ├── buildDojo.bat
│   ├── buildThemes.bat
│   ├── dojo.profile.js   (usado na compilação do Dojo)
│   ├── themes.profile.js (usado na compilação dos Temas)
│   └── readme.txt   (este arquivo)

---
Para compilar Dojo/Manager
---
buildDojo.bat

---
Para compilar os temas
---
buildThemes.bat
