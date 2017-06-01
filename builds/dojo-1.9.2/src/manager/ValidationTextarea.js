require(["dojo/_base/declare",
        "dojo/parser",
        "dijit/form/Form",
        "dijit/form/SimpleTextarea",
        "dijit/form/ValidationTextBox"
    ],function(declare, parser, form, simpleTextarea, validationTextBox){
        return declare("Manager.ValidationTextarea",[validationTextBox, simpleTextarea], {

            regExp: "(.|\\s)*",

            onBlur: function() {
                if (!this.isValid()) {
                    this.displayMessage(this.getErrorMessage());
                }
            }
        });
    }
);