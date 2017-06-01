// dijit.form.DateTextBox has a standard date format (ansi) : yyyy-mm-dd
// so, build a new Dijit Widget to force date format to 'dd/mm/yyyy' on submit

define("manager/DateTextBox", [
    	"dojo/_base/declare", // declare
	"dijit/form/DateTextBox"
], function(declare, DateTextBox){
    return declare("Manager.DateTextBox",
        [DateTextBox], {

		managerFormat: {
            selector: 'date',
            datePattern: 'dd/MM/yyyy'
        },
        value: "",
        // prevent parser from trying to convert to Date object
        postMixInProperties: function() { // change value string to Date object
              this.inherited(arguments);
              // convert value to Date object
              this.value = dojo.date.locale.parse(this.value, this.managerFormat);
        },
        // To write back to the server in Maestro format, override the serialize method:
        serialize: function(dateObject, options) {
              return dojo.date.locale.format(dateObject, this.managerFormat).toUpperCase();
        }

})
});
