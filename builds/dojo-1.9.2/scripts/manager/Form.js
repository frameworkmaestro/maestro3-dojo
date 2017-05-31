define("manager/Form", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.Form",[],{
        id: null,
        onLoad: new Function(),
        onSubmit: new Function(),
        validators: null,
        connections: null,
        constructor: function(id) {
            this.id = id;
            this.connections = [];
        },
        setFocus: function (fieldName) {
            if (fieldName == '') {
                var element = null;
                var f = manager.getElementById(this.id);
                var children = f.getElementsByTagName('input');
                if (children.length == 0) {
                    var children = f.getElementsByTagName('select');
                    if (children.length > 0) {
                        element = children[0];
                    }
                } else {
                    element = children[0];
                }
            } else {
                var element = manager.getElementById(fieldName);
            }
            if (element != null) {
                element.focus();
            }
        },
        getInputs: function() {
            var getstr = new Object();
            var f = manager.getElementById(this.id);
            var inputs = f.getElementsByTagName('input');
            for (var i = 0, length = inputs.length; i < length; i++) {
                var input = inputs[i];
                if ((input.type == "text") || (input.type == "hidden")) {
                    if (getstr[input.name])
                    {
                        getstr[input.name] += "&" + input.value;
                    } else {
                        getstr[input.name] = input.value;
                    }
                }
                if (input.type ==	"checkbox") {
                    if (input.checked) {
                        getstr[input.name] = (input.value == '' ? 'on' : input.value);
                    }
                }
                if (input.type ==	"radio") {
                    if (input.checked) {
                        getstr[input.name] = input.value;
                    }
                }
            }
            var inputs = f.getElementsByTagName('select');
            for (var i = 0, length = inputs.length; i < length; i++) {
                var input = inputs[i];
                getstr[input.name] = input.options[input.selectedIndex].value;
            }
            return getstr;
        },
        getForm: function() {
            return manager.getElementById('frm_'+this.id);
        },
        setAction: function(url) {
            manager.getElementById('frm_'+this.id).action = url;
        },
        getAction: function() {
            return manager.getElementById('frm_'+this.id).action;
        },
        init: function() {
            console.log('form initing - validators nulling');
            this.validators = null;
        //        this.disconnect();
        },
        submit: function() {
            return manager.getElementById('frm_'+this.id).submit();
        },
        connect: function(elementId, event, handler) {
            var node = dojo.byId(elementId);
            if (!node) return;
            this.connections.push(
                dojo.connect(node,event,handler)
                );
        },
        disconnect: function() {
            dojo.forEach(this.connections, dojo.disconnect);
            this.connections.length = 0;
        }
    });
});