define("manager/Window", [
    "dojo/_base/declare",
	"dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    "manager/Dialog",
    "manager/DialogSimple"
    ], function(declare, lang, on, topic, Dialog, DialogSimple){
        return declare("Manager.Window",
            null, {
                id: '',
                title: '',
                href: '',
                parent: null,
                form: '',
                template: '',
                element: '',
                dialog: null,
                scripts: null,
                constructor: function(id) {
                    this.obj = this;
                    this.id = id;
                    this.dialog = new Dialog({
                        id: id
                    });
                    //on(this.dialog,'load', lang.hitch(this.dialog, "enableDrag"));
                    //on(this.dialog,'load', lang.hitch(this.dialog, "position"));
					on(this.dialog,'load', lang.hitch(this.dialog, function(){this.enableDrag();this._position();}));
                },
                setTitle: function(title) {
                    this.title = title;
                },
                setHref: function(href) {
                    this.href = href;
                },
                push: function() {
                    this.obj.template = manager.page.template;
                    this.obj.element = manager.page.element;
                    manager.pushWindow(this.obj);
                },
                open: function() {
                    this.obj.push();
                    manager.page.get(this.obj.href,this.obj.id);
                    this.dialog.show();
                    console.log('publishing windowAction');
                    topic.publish('windowActionOpen',this.obj.id);
                },
                show: function() {
                    this.dialog.show();
                },
                hide: function() {
                    this.dialog.hide();
                },
                setContent: function(content) {
                    this.dialog.set('content',content);
                },
                showContent: function(content) {
                    this.obj.push();
                    this.dialog.set('content',content);
                    this.dialog.show();
                },
                close: function() {
                    this.dialog.hide();
                    console.log('publishing windowAction');
                    topic.publish('windowActionClose',this.obj.id);
                    this.dialog.destroyDescendants();
                    this.obj.pop();
                },
                pop: function() {
                    console.log('Closing...');
                    manager.page.template = this.obj.template;
                    manager.page.element = this.obj.element;
                    manager.popWindow();
                }
            });
    });