define("manager/MultiSelection", ["dojo/_base/declare","manager/MultiTextField2"], function(declare, MultiTextField2) {
    return declare("Manager.MultiSelection",[],{

        add: function (n) {
            var list = manager.getElementById(this.mtfName + this.emptyField);
            console.log(list);
            var selection = manager.getElementById(this.mtfName + '_options' + n);
            var n = list.length;
            var i = 0;
            var achou = false;
            var atext = selection.options[selection.selectedIndex].text;
            for (i = 0; i < n; i++) {
                if (list.options[i].text == atext)
                    achou = true;
            }
            if (achou) {
                alert('Item jÃ¡ estÃ¡ na lista!');
            }
            else {
                list.options[n] = new Option(atext);
                list.selectedIndex = n;
            }
        }
    });
});
