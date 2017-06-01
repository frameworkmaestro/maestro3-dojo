define("manager/FormPopup", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.FormPopup",[],{
        context: null,
        url: '',
        constructor: function() {
            this.obj = this;
        },
        setContext: function(context) {
            this.context = context;
        },
        start: function() {
            console.log('popup context action = ' + this.context.action);
            this.url = this.context.action + '?__popupName=' + this.context.name;
            console.log('popup url = ' + this.url);
            if ( this.context.filter != '' ) {
                console.log(this.context.filter);
                var aFilter = this.context.filter.split(',');
                console.log(aFilter);
                for( var i=0; i < aFilter.length; i++ )
                {
                    var id = aFilter[i];
                    if (field = dijit.byId(id)) {
                        var value = field.get('value');
                    } else {
                        field = manager.getElementById(id);
                        var value = escape(field.value);
                    }
                    var filterName = 'filter' + i;
                    this.url = this.url + '&' + filterName + '='  + value;
                }
            }
            console.log("subscribing ");
            dojo.subscribe('windowActionClose', this, this.close);
            this.open();
        },
        open: function() {
            var window = manager.getWindow(this.context.name);
            if (!window){
                manager.addWindow(this.context.name);
            }
            manager.getWindow(this.context.name).setHref(this.url);
            manager.getWindow(this.context.name).open();
        },
        close: function(id) {
            console.log('id = ' + id);
            if (id == this.context.name){
                console.log("#" + id + " form");
                var form = dojo.query("#" + id + " form");
                console.log(form);
                var object = dijit.byId(form[0].id).getValues();
                this.deliver(form[0].id);
            }
        },
        deliver: function(formId) {
            console.log('deliver');
            console.log('formId = ' + formId);
            related = this.obj.context.related;
            console.log(related);
            var pattern = /(.*):([^:]*)/;
            var aRelated = related.split(',');
            for( var i=0; i<aRelated.length; i++ ){
                aRelated[i] = aRelated[i].replace(/::/g,'!');
                var aId = pattern.exec(aRelated[i]) || Array(aRelated[i], aRelated[i]);
                console.log(aId);
                var column = (aId[2]? aId[2] : aId[1]);	
                column = column.replace(/\!/g,'::');
                console.log(column);
                var node = manager.getElementById(column);
                var value = node.value;
                aId[1] = aId[1].replace('!','::');
                console.log(aId[1]);
                var field = dijit.byId(aId[1]);
                if (field) {
                    field.set('value', value);
                } else {
                    field = manager.getElementById(aId[1]);
                    if (field != null) {
                        field.value = value;
                        field = manager.getElementById(field.name+'_sel');
                        if ( field != null ) {
                            field.value = value;
                        }
                    }
                }
            }
        }
    });
});