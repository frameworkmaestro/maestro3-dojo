define("manager/Grid", ["dojo/_base/declare","dojo/store/Memory"], function(declare, store) {
    return declare("Manager.Grid",[],{
        constructor: function(name, page) {
            this.name = name;
            this.page = page;
            this.idSelect = this.name+'_SELECT_CHECKED';
            this.firstIndex = 0;
            this.data = null;
            this.goPageStore = new store();
            this.hover();
        },
        hover: function(){
            var arg = "table#" + this.name + " tbody tr";
            dojo.query(arg).forEach(function(node, index, arr){
                manager.hover(node.id,
                    function(event){
                        event.currentTarget.originalClassName = 'row' + (index % 2);
                        event.currentTarget.className = event.currentTarget.className.replace(event.currentTarget.originalClassName,'rowenter');
                    },
                    function(event){
                        event.currentTarget.className = event.currentTarget.className.replace('rowenter',event.currentTarget.originalClassName);
                    }
                    );
            });
        },
        selectRow: function(handler){
            var arg = "table#" + this.name + " tbody tr";
            dojo.query(arg).forEach(function(node, index, arr){
                node.index = index;
                dojo.connect(node, "ondblclick", function(event){
                    handler(event.currentTarget.index);
                } );
            });
        },
        setData: function(data){
            this.data = data;
        },
        addGoPage: function(data){
            for( var i=0; i < data.length; i++ ) {
                this.goPageStore.add(data[i]);
            }
        },
        getGoPage: function(){
            return this.goPageStore;
        },
        changeRow : function (index) {
            var div = manager.byId(this.name + '-row-' + index);
            if (!div) {
                div = manager.byId(this.name + 'DGrid-row-' + index);
            }
            var select = dijit.byId(this.name + '_SELECT' + '[' + index + ']');
            var classCSS = div.originalClassName ? div.originalClassName : div.className;
            if (select.get('checked')) {
                div.className = classCSS + 'Checked';
            } else {
                div.className = classCSS.replace('Checked','');
            }
            
        },
        check : function (index, value) {
            var select = dijit.byId(this.name+'_SELECT' +'[' + index + ']');
            var checked = manager.getElementById(this.idSelect);
            if (select.get('checked')) {
                checked.value = (checked.value != '' ? checked.value + ':' : '') + value;
            }
            else {
                var pattern = new RegExp('^'+value+':?|'+value+':?|:?'+value+'$');
                checked.value = checked.value.replace(pattern,'');
            }
            this.changeRow(index);
        },
        checkAll: function (n) {
            var chkAll = dijit.byId(this.name + 'chkAll');
            for( var i=0; i < n; i++ ) {
                var index = this.firstIndex + i;
                var select = dijit.byId(this.name+'_SELECT' +'[' + index + ']');
                if (chkAll.checked != select.checked) {
                    if (select.checked) {
                        value = select.get('value');
                        select.set('checked', false);
                    } else {
                        select.set('checked', true);
                        value = select.get('value');
                    }
                    this.check(index, value);
                }
            }
        },
        checkEachRow: function (n) {
            for ( var i=0; i < n; i++ ) {
                var index = this.firstIndex + i;
                this.changeRow(index);
            }
        },
        goPage: function (number) {
            manager.setElementValueById(this.name+'_PAGING','yes');
            manager.setElementValueById(this.name+'_PAGE',this.page);
            manager.setElementValueById(this.name+'_GOPAGE',number);
            //manager.setElementValueById('_GRIDNAME',this.name);
            manager.doPostBack(this.name);
        }
    });
});

