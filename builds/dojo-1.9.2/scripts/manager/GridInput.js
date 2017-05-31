define("manager/GridInput", ["dojo/_base/declare","dojo/store/Memory","dojo/store/Observable","dojo/json"], function(declare, store, observable, JSON) {
    return declare("Manager.GridInput", [], {
        constructor: function(id, fields, actionGrid) {
            console.log(id + ' - ' + fields);
            this.idGridInput = id;
            this.fields = fields;
            this.idField = manager.getElementById(id + '_id');
            this.actionGrid = actionGrid;
            this.table = manager.getElementById(id + '_gridInput');
            this.rowCount = 0;
            this.gridInputStore = new store();
            // adiciona um Observer 
            this.gridInputStore = observable(this.gridInputStore);
            this.gridInputQuery = this.gridInputStore.query();
            this.gridInputQuery.observe(function(row, removedFrom, insertedInto) {
                if (insertedInto > -1) { // adiciona row
                }
            });            
        },
        setData: function(){
            var data = manager.getElementById(this.idGridInput + '_data');
            data.value = JSON.stringify(this.gridInputStore.data);
        },
		loadData: function(data){
            for (var chave in data) {
                data[chave].id = ++this.rowCount;
                this.gridInputStore.add(data[chave]);
            }
            this.setData();
            manager.doAjaxText(this.actionGrid, this.idGridInput + "_divGrid",
                this.idGridInput + "_divGrid")
		},
        getInput: function() {
            var sFields = this.fields;
            var aFields = sFields.split(',');
            var fields = {};
            for (var i = 0; i < aFields.length; i++) {
                var id = aFields[i];
                var field = dijit.byId(id);
                if (field != null) {
                    fields[id] = field.get('value');
                    if (field.get('displayedValue') != field.get('value')) {
                        fields[id + '_text'] = field.get('displayedValue');
                    }
                } else {
                    var field = manager.getElementById(aFields[i]);
                    fields[id] = field.value;
                }
            }
            return fields;
        },
        select: function(data) {
           console.log('selectiong');
           console.log(data);
        },
        edit: function(id) {
            var sFields = this.fields;
            var aFields = sFields.split(',');
            var fields = {};
            var data = this.gridInputStore.get(id);
            this.idField.value = id;         
            for (var i = 0; i < aFields.length; i++) {
                var id = aFields[i];
                var field = dijit.byId(id);
                var value = data[id];
                if (field != null) {
                    field.set('value', value);
                } else {
                    var field = manager.getElementById(aFields[i]);
                    field.value = value;
                }
            }
        },
     	clearInput: function() {
            var sFields = this.fields;
            var aFields = sFields.split(',');
            var fields = {};
            var value = '';
            this.idField.value = '';
            for (var i = 0; i < aFields.length; i++) {
                var id = aFields[i];
                var field = dijit.byId(id);
                
                if (field != null) {
                    field.set('value', value);
                    if (field.get('displayedValue') != field.get('value')) {
                        field.set('displayedValue', value);
                    }
                } else {
                    var field = manager.getElementById(aFields[i]);
                    field.value = value;
                }
            }
        },
        add: function() {
            var row = this.getInput();
            if (this.gridInputStore.get(this.idField.value)){
            	row.id = this.idField.value;
            	this.gridInputStore.put(row);
            } else {
            	row.id = ++this.rowCount;
            	this.gridInputStore.add(row);
            }            
            this.setData();
            this.clearInput();
            manager.doAjaxText(this.actionGrid, this.idGridInput + "_divGrid", this.idGridInput + "_divGrid");            
        },
        remove: function(id) {
        	if (id){
                this.gridInputStore.remove(id);
        	} else {
	            var div = manager.getElementById(this.idGridInput + "_divGrid");
	            var tbody = manager.getElementsByTagName('TBODY',div).item(0);
	            var rows = manager.getElementsByTagName('TR',tbody);
	            for (var i = 0; i < rows.length; i++) {
	                var inputs = manager.getElementsByTagName('INPUT',rows[i]);
	                if (inputs[0].type == 'checkbox') {
	                    console.log(inputs[0]);
	                    if (inputs[0].checked) {
	                        var id = inputs[0].value;
	                        console.log('removing = ' + id);
	                        this.gridInputStore.remove(id);
	                    }    
	                }
	            }
	        }
            this.setData();
            manager.doAjaxText(this.actionGrid, this.idGridInput + "_divGrid", this.idGridInput + "_divGrid");            
        }
    });
});