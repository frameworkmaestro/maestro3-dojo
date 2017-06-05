define("manager/GridPages", ["dojo/_base/declare"], function(declare) {
    return declare("Manager.GridPages",[],{
        templateString: dojo.cache("../../manager", "templates/GridPages.html"),
        baseClass: "mGridPages",
        from: 0,
        to: 0,
        selected: 0,
        grid: '',

        postCreate: function() {
            var page = [];
            console.log('postCreate');
            console.log(this.from);
            console.log(this.to);
            console.log(this.selected);
            page[0] = document.createElement('span');
            page[0].appendChild(document.createTextNode('Páginas:'));
            page[0].className = 'text';
            this.containerNode.appendChild(page[0]);
            for(var i = this.from; i <= this.to; i++) {
                page[i] = document.createElement('span');
                page[i].appendChild(document.createTextNode(i));
                page[i].className = (i == this.selected) ? 'selected' : 'link';
                this.containerNode.appendChild(page[i]);
            }
        },

        onClick: function(event) {
            console.log(this.grid);
            console.log(event.target.childNodes[0].nodeValue);
        }

    });
});
