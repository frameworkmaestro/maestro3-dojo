// Apenas estabelece valores padrões para um dojox.layout.ContentPane.
// Usado como base dos elementos de uma página no framework Maestro.

define("manager/Tree", [
    "dojo/_base/declare",
	"dojo/_base/window", 
	"dojo/store/Memory",
    "dijit/tree/ObjectStoreModel", 
	"dijit/Tree"
    ], function(declare, window, Memory, ObjectStoreModel, Tree){
        return declare("Manager.Tree",
            [Tree], {
			constructor: function(obj) {
				this.root = (obj.root ? obj.root : 'root');
	            this.store = new Memory({
		            data: obj.data,
			        getChildren: function(object){
				        return this.query({parent: object.id});
					}
	            });
		        // Create the model
			    this.model = new ObjectStoreModel({
				    store: this.store,
					mayHaveChildren: function(item){
	                    return (item.type == 'folder');
		            },                         
			        query: {id: this.root}
				});
				this.layout = obj.layout;
				this.onClick = obj.selectEvent;
				this.iconFolderOpened = (obj.iconFolderOpened ? obj.iconFolderOpened : 'iconFolderOpened');
				this.iconFolderClosed = (obj.iconFolderClosed ? obj.iconFolderClosed : 'iconFolderClosed');
				this.iconLeaf =  (obj.iconLeaf ? obj.iconLeaf : 'iconLeaf');
			},
			store: null,
            model: null,
            getIconClass: function (item, opened) {
				//console.log(item);
                var cls = (!item || (item.type == 'folder')) ? opened ? this.iconFolderOpened : this.iconFolderClosed : this.iconLeaf;
                return cls + this.layout;
            },
            showRoot: false
      });
});
