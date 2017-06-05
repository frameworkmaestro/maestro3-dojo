require([
	'dojo/_base/kernel', 
	'dojo/_base/loader'
	], function(dojo){
    dojo.registerModulePath("manager", "../manager");
});

// nls
require([
    "dojo/i18n!dojo/cldr/nls/pt/currency", 
    "dojo/i18n!dojo/cldr/nls/pt/number", 
    "dojo/i18n!dojo/cldr/nls/pt/gregorian"
]);

// layers
require([
    "manager/dijit", 
    "manager/dojox" 
]);

require(["manager/Core"], function(Core) {
    window.manager = Core;
});
require(["manager/BoxPane"]);
require(["manager/Grid"]);
require(["manager/Lookup"]);
require(["manager/FormPopup"]);
