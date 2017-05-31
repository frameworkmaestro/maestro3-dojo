define("manager/ComboBox", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.ComboBox",[],{
        constructor: function(name) {
            this.name = name;
        },
        onTextChange : function (label,textField,selectionList) {
            var tf = dijit.byId(textField);
            var sl = dijit.byId(selectionList);
            var text = tf.value;
            /*
        for ( var i=0; i < sl.options.length; i++ ) {
            if ( sl.options[i].value == text ) {
                sl.selectedIndex = i;
                return;
            }
        }
         */
            console.log(sl.valueNode.value);
            console.log(sl.textbox.value);
            sl.valueNode.value = text;
            console.log(sl.valueNode.value);
            console.log(sl.textbox.value);
            if (sl.textbox.value == '') {
                alert("!!! ATENÇÃO!!!\n\não existe uma opção correspondente ao valor '" + text + "'\ndo campo '" + label + "'!");
                tf.value = '';
                tf.focus();
            }
        },
        onSelectionChange : function (label,selectionList,textField) {
            var tf = dijit.byId(textField);
            var sl = dijit.byId(selectionList);
            var index = sl.selectedIndex;
            if ( index != -1 ) {
                tf.value = String(sl.options[index].value);
            }
        }
    });
});