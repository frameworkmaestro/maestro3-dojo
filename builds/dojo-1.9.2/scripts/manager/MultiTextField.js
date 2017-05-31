define("manager/MultiTextField", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.MultiTextField",[],{
        mtfName: '',
        constructor: function(mtfName) {
            this.mtfName = mtfName;
            this.leftSeparator = '[';
            this.rightSeparator = ']';
            this.separator = this.rightSeparator + ' ' + this.leftSeparator;
            this.emptyField = this.leftSeparator + this.rightSeparator;
        },
        getTable : function() {
            return eval(this.mtfName + '_table');
        },
        split: function (value) {
            return value.substring(1, value.length - 1).split(this.separator);
        },
        join: function (fields) {
            var value = this.leftSeparator;
            for (var i = 0; i < fields.length; i++) {
                if (i > 0) {
                    value += this.separator;
                }
                value += fields[i];
            }
            value += this.rightSeparator;
            return value;
        },
        onSubmit: function (sFields) {
            var name = this.mtfName;
            var form = dojo.byId(manager.getParentForm(name));
            while(manager.getElementById(name+'[]'))
            {
                dojo._destroyElement(name + '[]');
            }
            var tbl = this.getTable();
            data = tbl.getdata();
            console.log(data);

            var value = '';
            var aFields = sFields.split(',');
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    var list = document.createElement('INPUT');
                    list.id = name + '['+ i +']'+ '['+ j +']';
                    list.name = name + '['+ i +']'+ '['+ j +']';
                    list.type = 'hidden';

                    var field = dijit.byId(aFields[j]);
                    if (field.store){
                      //  var items = dojo.query("> option", field.store.root).filter(function(option){
                      //     return (option.innerText || option.textContent || '').match(data[i][j]);
                      //  } );
                      //  value = field.store.getValue(items[0],'value');
                        field.store.query({name:data[i][j]}).forEach(function(registro){
                            value = registro.id;
                        });
                        console.log(value);
                    } else {
                        value = data[i][j];
                    }

                    list.value = value;
                    form.appendChild(list);
                }
            }
            return true;
        },
        onSelect: function (sFields) {
            var tbl = this.getTable();
            tbl.onmouse = false;
            tbl.customSelect = function() {
                var aFields = sFields.split(',');
                var fields = new Array(aFields.length);
                var text = this.get(tbl.rowSelected);
                for (var i = 0; i < text.length; i++)
                {
                    var field = dijit.byId(aFields[i]);
                    if (field.store){
                        field.store.query({name:text[i]}).forEach(function(registro){
                            field.setValue(registro.id);
                        });
                    }
                    else if (field.options != null) // selection
                    {
                        for (var n = 0; n < field.options.length; n++)
                        {
                            if (field.options[n].text == text[i])
                            {
                                field.selectedIndex = n;
                                break;
                            }
                        }
                    }
                    else if(text[i] !== '') // text
                    {
                        field.textbox.value = text[i];
                    }
                }
            }
        },
        getInput: function (sFields) {
            var aFields = sFields.split(',');
            var fields = new Array(aFields.length);
            for (var i = 0; i < aFields.length; i++) {
                var field = manager.getElementById(aFields[i]);
                if (field.options != null) { // selection
                    fields[i] = field.options[field.selectedIndex].text;
                }
                else { // text
                    fields[i] = field.value;
                }
            }
            return fields;
        },
        add: function (sFields) {
            var tbl = this.getTable();
            tbl.add(this.getInput(sFields));
        },
        remove: function (sFields) {
            var tbl = this.getTable();
            if (this.isSelected())
            {
                tbl.drop(tbl.rowSelected);
            }

        },
        modify: function (sFields) {
            var tbl = this.getTable();
            if (this.isSelected())
            {
                tbl.modify(tbl.rowSelected, this.getInput(sFields));
            }
        },
        isSelected: function(){
            var tbl = this.getTable();
            if (tbl.rowSelected == '')
            {
                alert('Nenhum item selecionado!');
                return false
            }else{
                return true
            }
        }
    });
});
