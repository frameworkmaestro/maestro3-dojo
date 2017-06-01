define("manager/Page", [
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/_base/array",
    "dijit/registry",
    "dojo/dom-construct",
    "dojo/dom-form",
    "dojo/i18n!./nls/messages",
    "manager/Base64",
    "dojox/widget/Standby"
], function(declare, lang, window, array, registry, domConstruct, domForm, i18n, Base64, Standby) {
    return declare("Manager.Page", [], {
        version: '1.1',
        ajaxEvent: 'no',
        fileUpload: 'no',
        layout: 'default',
        element: '', // element of layout to be filled with html content via ajax
        mainElement: 'centerPane', // default element of layout to be filled via ajax
        template: 'base', // 'base','window','ajax''
        eventTarget: '',
        i18n: i18n,
        standby: '',
        callbackFunction: '',
        constructor: function() {
            this.obj = this;
        },
        getContent: function(idForm) {
            var content = {
                __LAYOUT: manager.page.layout,
                __ELEMENT: manager.page.element,
                __TEMPLATE: manager.page.template,
                __ISFILEUPLOAD: manager.page.fileUpload,
                __ISAJAXEVENT: manager.page.ajaxEvent,
                __EVENTTARGET: manager.page.eventTarget
            };
            var formData = {};
            if (idForm) {
                formData = domForm.toObject(idForm);
            }
            return lang.mixin(content, formData);
        },
        get: function(url, element) {
            if (element == '') {
                element = this.mainElement;
            }
            registry.byId(element).set('href', url);
        },
        page: function(url) {
            manager.disconnect();
            window.location = url;
        },
        ajax: function(url, callbackFunction, idForm) {
            var isFileUpload = this.fileUpload;
            this.setBusy(idForm);            
            this.ajaxEvent = 'yes';
            this.template = 'ajax';
            this.fileUpload = 'no';
            this.callbackFunction = callbackFunction;
            var ajaxSubmit = new Manager.Ajax({
                url: url,
                form: idForm,
                content: manager.page.getContent(idForm),
                response_type: 'JSON',                
                callback_function: manager.page.callbackFunction
            });
            ajaxSubmit.call();
            this.fileUpload = isFileUpload;
        },
        ajaxText: function(url, updateElement, idForm) {
            var isFileUpload = this.fileUpload;
            this.setBusy(idForm);
            this.ajaxEvent = 'yes';
            this.template = 'ajax';
            this.fileUpload = 'no';
            var element = this.element;
            this.element = updateElement;
            var ajaxSubmit = new Manager.Ajax({
                url: url,
                form: idForm,
                content: manager.page.getContent(idForm),
                response_type: 'JSON',
                callback_function: manager.page.callback
            });
            ajaxSubmit.call();
            this.element = element;
            this.fileUpload = isFileUpload;
        },
        postback: function(idForm) {
            if (idForm) {
                this.setBusy(idForm);
                this.element = manager.getLayoutElement(idForm);
                var fileUpload = manager.getElementById('__ISFILEUPLOADPOST');
                this.fileUpload = (fileUpload != null) ? fileUpload.value : this.fileUpload;
            }
            var url = registry.byId(idForm).get('action');
            var ajaxPostBack = new Manager.Ajax({
                url: url,
                form: idForm,
                content: manager.page.getContent(idForm),
                response_type: 'JSON',
                callback_function: manager.page.callback
            });
            ajaxPostBack.call();
        },
        callback: function(result, ioArgs) {
            var element = ioArgs.args.content.__ELEMENT;
            manager.page.updateElement(element, result);
            manager.page.clearBusy();
        },
        updateElement: function(updateElement, result) {
            if (result.base64) {
                var base64 = new Base64();
                var decode = base64.decode(result.base64);
                result = eval("(" + decode + ")");
                console.log(result);
            }
            if (result.data) {
                var html = result.data;
                var id = result.id;
                if (result.type == 'page') {
                    if (updateElement == '') {
                        updateElement = '__updateElement';
                    }
                    var element = registry.byId(updateElement);
                    if (!element) {
                        var div = domConstruct.create("div");
                        div.id = updateElement;
                        domConstruct.place(div, window.body(), "last");
                        element = new Manager.ElementPane({
                            content: html
                        }, updateElement);
                    }
                    try {
                        array.forEach(element.getDescendants(), function(widget) {
                            if (registry.byId(widget.id)) {
                                widget.destroyRecursive()
                            }
                            ;
                        });
                        element.setContent(html);
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (result.type == 'prompt') {
                    manager.doPrompt(id, html);
                }
                if (result.type == 'window') {
                    manager.doWindow(result.data);
                }
                if (result.type == 'file') {
                    manager.doFile(result.data, id);
                }
                if (manager.onLoad[id]) {
                    manager.onLoad[id].apply();
                }
            }
        },
        setBusy: function(id) {
            var use = manager.getElementById('useSetBusy');
            if (use && (use.value == 'no')) {
                return;
            }
            if (registry.byId('page_standby')) {
                this.clearBusy(id);
            }
            this.standby = new Standby({
                target: id,
                id: 'page_standby',
				image: require.toUrl("manager/resources/images/loading.gif").toString(),
                text: this.i18n.PLEASE_WAIT
            });
            document.body.appendChild(this.standby.domNode);
            this.standby.startup();
            this.standby.show();
        },
        clearBusy: function() {
            if (registry.byId('page_standby')) {
                registry.byId('page_standby').hide();
                registry.byId('page_standby').destroy();
            }
        }
    });
});