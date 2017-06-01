// Apenas estabelece valores padrões para um dojox.layout.ContentPane.
// Usado como base dos elementos de uma página no framework Maestro.

define("manager/ElementPane", [
    "dojo/_base/declare",
    "dojo/query",
    "dojox/layout/ContentPane"
    ], function(declare, query, ContentPane){
        return declare("Manager.ElementPane",
            [ContentPane], {
                executeScripts: true,
                baseClass: "mElement",
                onLoad : function() {
                    var node = query("#"  + this.id + " div.mScripts");
                    if (node.length) {
                        manager.onLoad[node[0].id].apply();
                        manager.onLoad[node[0].id] = null;
                    }
                },
                cleanContent: true
            });
});
