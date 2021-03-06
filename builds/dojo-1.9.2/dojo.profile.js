var profile = {      
    basePath: "./src/", 
    releaseDir: "../release/scripts",
    layerOptimize: "shrinksafe.keepLines", 
    hasReport: true,
	localeList: "en,pt,pt-br", 
    action: "release",
    optimize: "closure",
    mini: true,
	cssOptimize: true,

    defaultConfig: {
        hasCache:{
           "dojo-built": 1,
           "dojo-loader": 1,
           "dom": 1,
           "host-browser": 1,
           "config-selectorEngine": "lite"
        }
	},

    packages:[ 
    {
        name: "manager",
        location: "manager"
    },
    {
        name: "dojo",
        location: "dojo"
    },
    {
        name: "dijit",
        location: "dijit"
    },
    {
        name: "dojox",
        location: "dojox"
    },
    {
        name: "dgrid",
        location: "dgrid"
    },
    {
        name: "xstyle",
        location: "xstyle"
    },
    {
        name: "put-selector",
        location: "put-selector"
    }
    ], 

	layers: {
		"dojo/dojo": {
			include: [
			"dojo/request/default",
			"dojo/_base/fx",
			"dojo/dom-form",
			"dojo/i18n",
			"dojo/promise/tracer",
			"dojo/errors/RequestError",
			"dojo/_base/html",
			"dojo/_base/kernel",
			"dojo/io-query",
			"dojo/_base/Deferred",
			"dojo/NodeList-dom",
			"dojo/query",
			"dojo/has",
			"dojo/_base/loader",
			"dojo/json",
			"dojo/_base/declare",
			"dojo/dom",
			"dojo/_base/browser",
			"dojo/selector/acme",
			"dojo/errors/RequestTimeoutError",
			"dojo/dom-geometry",
			"dojo/dom-style",
			"dojo/dom-prop",
			"dojo/when",
			"dojo/dom-attr",
			"dojo/dom-construct",
			"dojo/request/xhr",
			"dojo/text",
			"dojo/keys",
			"dojo/domReady",
			"dojo/_base/lang",
			"dojo/request/util",
			"dojo/Evented",
			"dojo/mouse",
			"dojo/_base/xhr",
			"dojo/topic",
			"dojo/loadInit",
			"dojo/dojo",
			"dojo/_base/unload",
			"dojo/Deferred",
			"dojo/_base/NodeList",
			"dojo/request",
			"dojo/_base/Color",
			"dojo/promise/instrumentation",
			"dojo/selector/_loader",
			"dojo/promise/Promise",
			"dojo/request/watch",
			"dojo/on",
			"dojo/_base/sniff",
			"dojo/errors/create",
			"dojo/_base/array",
			"dojo/_base/json",
			"dojo/_base/window",
			"dojo/dom-class",
			"dojo/_base/config",
			"dojo/main",
			"dojo/_base/event",
			"dojo/sniff",
			"dojo/request/handlers",
			"dojo/aspect",
			"dojo/ready",
			"dojo/_base/connect",
			"dojo/errors/CancelError",
			"dojo/selector/lite"
			]
		},
        "manager/dijit": {
            include: [
			"dojo/cldr/nls/currency",
			"dojo/cldr/nls/number",
			"dojo/cldr/nls/gregorian",
			"dojo/selector/lite",
			"dojo/data/ItemFileReadStore",
			"dojo/data/ItemFileWriteStore",
			"dojo/data/ObjectStore",
			"dojo/fx/Toggler",
            "dijit/_base",
            "dijit/_Widget",
            "dijit/_Templated",
            "dijit/_WidgetBase",
            "dijit/_TemplatedMixin",
            "dijit/_CssStateMixin",
            "dijit/registry",
            "dijit/form/_FormMixin",
			"dijit/ColorPalette",
            "dijit/Dialog",
            "dijit/Editor",
            "dijit/Menu",
            "dijit/MenuBar",
            "dijit/MenuBarItem",
			"dijit/PopupMenuBarItem",
			"dijit/PopupMenuItem",
			"dijit/CheckedMenuItem",
            "dijit/Toolbar",
            "dijit/Tooltip",
            "dijit/Tree",
            "dijit/WidgetSet",
            "dijit/PopupMenuItem",
            "dijit/tree/ForestStoreModel",
            "dijit/tree/ObjectStoreModel",
            "dijit/TooltipDialog",
            "dijit/_editor/plugins/FontChoice",
            "dijit/_editor/plugins/TextColor",
            "dijit/form/Button",
            "dijit/form/CheckBox",
            "dijit/form/ComboBox",
            "dijit/form/CurrencyTextBox",
            "dijit/form/DateTextBox",
            "dijit/form/FilteringSelect",
            "dijit/form/Form",
            "dijit/form/MultiSelect",
            "dijit/form/NumberSpinner",
            "dijit/form/NumberTextBox",
            "dijit/form/RadioButton",
            "dijit/form/Select",
            "dijit/form/SimpleTextarea",
            "dijit/form/TextBox",
            "dijit/form/TimeTextBox",
            "dijit/form/ValidationTextBox",
            "dijit/form/ComboButton",
			"dijit/form/nls/pt/validate",
            "dijit/layout/AccordionContainer",
            "dijit/layout/AccordionPane",
            "dijit/layout/ContentPane",
            "dijit/layout/StackContainer",
            "dijit/layout/TabContainer",
            "dijit/layout/TabContainer",
            "dijit/layout/BorderContainer",
			"xstyle/css",
			"xstyle/load-css",
			"xstyle/has-class",
			"dgrid/List", 
			"dgrid/OnDemandGrid", 
			"dgrid/Selection",
            "dgrid/Keyboard", 
			"dgrid/util/misc",
			"dgrid/util/mouse",	
			"dgrid/util/touch"
            ],
			exclude: [
				"dojo/dojo"
			],
			includeLocales: ["en", "pt", "pt-br"] 
		},
        "manager/dojox": {
            include: [
			"dojox/editor/plugins/PasteFromWord",
            "dojox/editor/plugins/TablePlugins",
			"dojox/widget/Standby",
            "dojox/layout/ContentPane",
            "dojox/form/Uploader",
            "dojox/form/uploader/FileList",
            "dojox/form/uploader/plugins/IFrame",
            "dojox/validate",
            "dojox/validate/br",
            "dojox/validate/web",
            "dojox/html/styles",
			"dojox/widget/Standby"
            ],
			exclude: [
				"dojo/dojo",
				"manager/dijit"
			],
			includeLocales: ["en", "pt", "pt-br"] 
		},
        "manager/main": {
            include: [
            "manager/Utils",
            "manager/Hash",
            "manager/MD5",
            "manager/Core",
            "manager/Ajax",
            "manager/Page",
            "manager/UTF8",
            "manager/Base64",
            "manager/Patches",
            "manager/ElementPane",
            "manager/Form",
            "manager/ComboBox",
            "manager/Currency",
            "manager/BoxPane",
            "manager/DateTextBox",
            "manager/DGrid",
            "manager/Dialog",
            "manager/DialogSimple",
            "manager/DnD",
            "manager/EditMask",
            "manager/Grid",
            "manager/GridInput",
            "manager/DataGrid",
            "manager/GridPages",
            "manager/Lookup",
            "manager/FormPopup",
            "manager/MultiTextField",
            "manager/MultiTextField2",
            "manager/MultiSelection",
            "manager/TextTable",
            "manager/TransferBox",
            "manager/Validate",
            "manager/ValidationTextarea",
            "manager/Tree",
            "manager/Window"
            ],
			exclude: [
				"dojo/dojo",
				"manager/dijit",
				"manager/dojox"
			],
			includeLocales: ["en", "pt", "pt-br"] 
		}
	}
};
