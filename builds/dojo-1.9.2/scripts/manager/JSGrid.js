define("manager/JSGrid", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.JSGrid",[],{
        constructor: function(name, page) {
            this.name = name;
            this.page = page;
            this.idSelect = this.name+'_SELECT_CHECKED';
            this.firstIndex = 0;
            this.data = null;
            this.hover();
            this.widget = null;
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
        changeRow : function (index) {
            var tr = manager.getElementById('row' + this.name +'[' + index + ']');
            var select = dijit.byId(this.name+'_SELECT' +'[' + index + ']');
            if (select.get('checked')) {
                if (tr.className=='row1')
                    tr.className='row1checked';
                else if (tr.className=='row2')
                    tr.className='row2checked';
                else if (tr.className=='row0')
                    tr.className='row0checked';
            }
            else {
                if (tr.className=='row1checked')
                    tr.className='row1';
                else if (tr.className=='row2checked')
                    tr.className='row2';
                else if (tr.className=='row0checked')
                    tr.className='row0';
            }
        },
        check : function (index, value) {
            var select = dijit.byId(this.name+'_SELECT' +'[' + index + ']');
            console.log(this.idSelect);
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
            for( var i=0; i < n; i++ ) {
                var index = this.firstIndex + i;
                var select = dijit.byId(this.name+'_SELECT' +'[' + index + ']');
                var chkAll = dijit.byId(this.name + 'chkAll');
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
            manager.setElementValueById('_PAGING','yes');
            manager.setElementValueById(this.name+'_PAGE',this.page);
            manager.setElementValueById(this.name+'_GOPAGE',number);
            manager.setElementValueById('_GRIDNAME',this.name);
            manager.doPostBack(this.name);
        }
    });
});

//miolo.grid = new miolo.Grid();

