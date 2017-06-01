define("manager/Lookup", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.Lookup",[],{
        context: null,
        url: '',
        handle: null,
        constructor: function() {
            this.obj = this;
        },
        setContext: function(context) {
            this.context = context;
        },
        start: function() {
            console.log('lookup context action = ' + this.context.action);
            this.url = this.context.action + '?__lookupName=' + this.context.name;
            console.log('lookup url = ' + this.url);
            if ( this.context.filter != '' ) {
                console.log(this.context.filter);
                var aFilter = this.context.filter.split(',');
                console.log(aFilter);
                for( var i=0; i < aFilter.length; i++ )
                {
                    var id = aFilter[i];
                    if (id != 'none') {
                        if (field = dijit.byId(id)) {
                            var value = field.get('value');
                        } else {
                            field = manager.getElementById(id);
                            var value = escape(field.value);
                        }
                        //var filterName = 'filter' + i;
                        var filterName = id;
                        this.url = this.url + '&' + filterName + '='  + value;
                    }
                }
            }
            this.handle = dojo.subscribe(this.context.name, this, this.deliver);
            if (this.context.autocomplete) {
                this.autocomplete();
            } else {
                this.open();
            }
        },
        open: function() {
            var winName = this.context.name;
            var window = manager.getWindow(winName);
            if (!window){
                manager.addWindow(winName);
            }
            manager.getWindow(winName).setHref(this.url);
            manager.getWindow(winName).open();
        },
        autocomplete: function() {
            var ajaxAutoComplete = new manager.Ajax({
                url: this.url,
                response_type: 'TEXT',
                parameters: {
                    name: this.context.name,
                    __ISAJAXCALL: 'yes'
                },
                callback_function: function(result, ioArgs) {
                    var args = result;
                    var name = ioArgs.args.content.name;
                    var lookup = eval(name);
                    lookup.deliver(name,0,args);
                }
            });
            ajaxAutoComplete.call();
        },
        deliver: function(object) {
            related = this.obj.context.related;            
            var pattern = /(.*):([^:]*)/;
            var aRelated = related.split(',');            
            for( var i=0; i<aRelated.length; i++ ){                
				var aId = pattern.exec(aRelated[i]) || Array(aRelated[i], aRelated[i]);
                var column = (aId[2]? aId[2] : aId[1]);				
                var value = object[column];
                if (aId[1] != 'none') {
                    var field = dijit.byId(aId[1]);
                    if (field != null) {
                        if (field.declaredClass === 'Manager.DateTextBox'){
							var dateValue = value.split("/");
							field.set("value", dateValue[2] + '-' + dateValue[1] + '-' + dateValue[0]);
						} else {
							field.set("value", value);
						}
                    } else {
                        field = manager.getElementById(aId[1]);
                        if (field != null) {
                            field.value = value;
                            console.log(field.value);
                            field = manager.getElementById(field.name+'_sel');
                            if ( field != null ) {
                                field.value = value;
                            }
                        }
                    }
                }
            }
            dojo.unsubscribe(this.handle);
            manager.getWindow(this.obj.context.name).close();
        }
    });
});