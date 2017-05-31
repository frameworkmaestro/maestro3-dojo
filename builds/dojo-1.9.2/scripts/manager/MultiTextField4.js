define("manager/MultiTextField4", ["dojo/_base/declare","manager/MultiTextField3"], function(declare, MultiTextField3) {
    return declare("Manager.MultiTextField4",[],{
        getTable : function() {
            //		return eval(mtfName + '_table');
            return manager.page.controls.get(this.mtfName + '_table');
        },
        onSubmit: function (formid, name) {
            while(manager.getElementById(name+'[]'))
            {
                dojo._destroyElement(name + '[]');
            }
            var tbl = this.getTable();
            data = tbl.getdata();
            for (var i = 0; i < data.length; i++) {
                var list = document.createElement('INPUT');
                list.id = name + '[]';
                list.name = name + '[]';
                list.type = 'hidden';
                list.value = this.join(data[i]);
                console.log(list.value);
                manager.getForm(formid).getForm().appendChild(list);
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
                    var field = manager.getElementById(aFields[i]);
                    if (field.options != null) // selection
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
                    else // text
                    {
                        field.value = text[i];
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
            tbl.drop(tbl.rowSelected);
        },
        modify: function (sFields) {
            var tbl = this.getTable();
            if (tbl.rowSelected != '')
            {
                tbl.modify(tbl.rowSelected, this.getInput(sFields));
            }
            else
            {
                alert('É preciso selecionar o item a ser modificado!');
            }
        }
    });
});
