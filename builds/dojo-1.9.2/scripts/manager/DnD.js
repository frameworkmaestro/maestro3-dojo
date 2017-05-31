define("manager/DnD", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.Dnd",[],{
        id: '',
        dropped: null,
        constructor: function(id) {
            this.id = id;
            this.dropped = new Array();
        },
        onDrop: function(dropOn, s ,n , c) {
            console.log(this);
            console.log(dropOn);
            console.log(s);
            console.log(n);
            var sid = s.node.id;
            var obj = this;
            dojo.forEach(n, function (e,i,a) {
                obj.dropped.push(e.id + '=' + dropOn);
            });
        },
        onSubmit: function() {
            var s = '';
            dojo.forEach(this.dropped, function (e,i,a) {
                s = s + ((s == '') ? '' : '&') + e
                });
            console.log(this.id);
            console.log(s);
            dojo.byId(this.id).value = s;
            return true;
        }
    });
});
