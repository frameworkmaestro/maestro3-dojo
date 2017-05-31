define("manager/DataGrid", ["dojo/_base/declare", "dojox/grid/DataGrid"], function(declare, DataGrid) {
    return declare("Manager.DataGrid",[DataGrid],{
        constructor: function(name, page) {
            this.obj = this;
            this.name = name;
            this.page = page;
            this.widget = null;
        },
        canSort : function (i) {
            console.log('can sort = ' + i);
            return (i != 3);
        },
        get : function (inRowIndex) {
            return [this.index, inRowIndex].join(', ');
        },
        removeEscape : function (value) {
            return value ? value.replace('&lt','<') : '';
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
