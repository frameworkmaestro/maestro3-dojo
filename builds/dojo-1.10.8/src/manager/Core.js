
define("manager/Core", [
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/on",
    "dojo/parser",
    "dijit/registry",
    "dojo/i18n!./nls/messages",
    "manager/MD5",
    "manager/Window",
    "manager/Form",
    "manager/DialogSimple",
    "manager/Page",
    "manager/Ajax"
    ], function(declare, array, dom, domClass, domStyle, on, parser, registry, i18n, MD5, Win, Form, DialogSimple, Page, Ajax) {
        return {
            version: 'Manager 1.1',
            md5: new MD5(),
            grid: null,
            webForm: null,
            connections: [],
            onSubmit: [],
            onLoad: [],
            i18n: i18n,
            action: '',
            page: new Page(),
            windows: {
                handle: [],
                sufix: 0,
                base: window
            },
            type: function(o) {
                return !!o && Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
            },  
            getAction: function() {
                return this.action;
            },
            setAction: function(idForm, action) {
                this.action = action;
                if (idForm) {
                    registry.byId(idForm).set('action',action);
                }
                return action;
            },
            getWindow: function(idWindow) {
                return this.windows.handle[(idWindow != '' ? idWindow : 'current')];
            },
            addWindow: function(idWindow) {
                var window = registry.byId(idWindow);
                if (!window){
                    this.windows.handle[idWindow] = new Win(idWindow);
                }
                return this.windows.handle[idWindow];
            },
            setWindow: function(oWindow) {
                this.windows.handle['current'] = oWindow;
            },
            pushWindow: function(oWindow) {
                var win = this.windows.handle['current'];
                oWindow.parent = win;
                this.windows.handle['current'] = oWindow;
            },
            popWindow: function() {
                var win = this.windows.handle['current'];
                this.windows.handle['current'] = win.parent;
            },
            forms: {
                handle: []
            },
            getForm: function(idForm) {
                return this.forms.handle[idForm];
            },
            addForm: function(idForm) {
                this.forms.handle[idForm] = new Form(idForm);
                return this.forms.handle[idForm];
            },
            setForm: function(idForm) {
                var form = this.getForm(idForm);
                this.webForm = ( form ? form : this.addForm(idForm));
            },
            getElementById: function (e) {
                if(typeof(e)!='string') {
                    return e;
                }
                if(document.getElementById) {
                    e = dom.byId(e);
                }
                else if(document.all) {
                    e = document.all[e];
                }
                else {
                    e = null;
                }
                return e;
            },
            byId: function (id) {
                var widget = registry.byId(id);
                if (widget) {
                    var node = widget;
                } else {
                    var node = dom.byId(id);
                }
                return node;
            },
            getElementsByTagName: function (tagName, p) {
                var list = null;
                tagName = tagName || '*';
                p = p || document;
                if (p.getElementsByTagName) list = p.getElementsByTagName(tagName);
                return list || new Array();
            },
            setElementValueById: function (e, value) {
                var node = this.getElementById(e);
                if (node != null) {
                    node.value = value;
                }
            },
            getElementValueById: function (e) {
                var node = this.getElementById(e);
                if (node != null) {
                    return node.value;
                }
                return null;
            },
            getParentForm: function (/*String|DOMNode*/startNode) {
                var node = dom.byId(startNode);
                root = dojo.doc;
                while (node && node !== root) {
                    if (node.action !== undefined) {
                        return node.id;
                    }
                    node = node.parentNode;
                }
                return null;
            },
            getLayoutElement: function (/*String|DOMNode*/startNode) {
                var node = dom.byId(startNode);
                root = dojo.doc;
                while (node && node !== root) {
                    if (domClass.contains(node, 'mElement')) {
                        return node.id;
                    }
                    node = node.parentNode;
                }
                return null;
            },
            parse: function (id) {
                try {
                    var byId = dom.byId(id);
                    if (byId) {
                        parser.parse(byId);
                    }
                } catch (e) {
                }
            },
            isHandler: function(url) {
                return (url.indexOf('index.php') > -1);
            },
            registerEvents: function(arrayEvents) {
                array.forEach(arrayEvents, function(event) {
                        manager.registerEvent(event[0],event[1],event[2],event[3],event[4]);
                });        
            },
            registerEvent: function (id, event, handler, preventDefault, isDijit) {
                try {
                    if (this.type(handler) == 'Function') {
                        var eventHandler = handler;
                    } else {
                        var eventHandler = new Function("event", handler + (preventDefault ? " event.preventDefault();" : "" ));
                    }   
                    node = this.byId(id);
                    if (!node) {
                        console.error('registerEvent ' + id + ':' + event + '. Error: node not found!');
                        return null;
                    }
                    var element = this.getLayoutElement(id);
                    this.connectionPush(element, on(node,event,eventHandler));
                } catch (e) {
                    console.error('registerEvent ' + id + ':' + event + '. Error: ' + e);
                }
            },
            connectionPush: function (element, handle){
                if (!this.connections[element]){
                    this.connections[element] = [];
                }
                this.connections[element].push(handle);
            },
            connect: function (arg1, arg2, arg3, arg4, arg5, arg6) {
                var element = this.getLayoutElement(arg1);
                this.connectionPush(element, on(arg1, arg2, arg3, arg4, arg5, arg6));
            },
            disconnect: function (element) {
                if (element != '') {
                    if (this.connections[element] !== undefined) {
                        array.forEach(this.connections[element], function (handler) {
                            handler.remove;
                        });
                        this.connections[element].length = 0;
                    }
                }
            },
            submit: function(idForm) {
                if (idForm) {
                    if (this.onSubmit[idForm]()) {
                        this.page.postback(idForm);
                    }
                } else {
                    this.page.postback();
                }    
            },
            doPost: function (idForm) {
                this.submit(idForm);
            },
            doPostBack: function (idBase) {
                var idForm = this.getParentForm(idBase);
                this.page.eventTarget = idBase;
                this.submit(idForm);
            },
            doLinkButton: function (url, idBase) {
                var idForm = this.getParentForm(idBase);
                this.setAction(idForm, url);
                this.page.eventTarget = idBase;
                this.submit(idForm);
            },
            doAjax: function (url, callbackFunction, idBase) {
                var idForm = this.getParentForm(idBase);
                this.page.ajax(url, callbackFunction, idForm);
            },
            doAjaxText: function (url, updateElement, idBase) {
                var idForm = this.getParentForm(idBase);
                this.page.ajaxText(url, updateElement, idForm);
            },
            doRedirect: function (url) {
                window.location = url;
            },
            doGet: function (url, element) {
                this.disconnect(element);
                this.page.get(url, element);
            },
            doDialog: function(idWindow, url) {
                var window = this.getWindow(idWindow);
                if (!window){
                    this.addWindow(idWindow);
                }
                this.getWindow(idWindow).setHref(url);
                this.getWindow(idWindow).open();
            },
            doPrintForm: function (url) {
                var w = screen.width * 0.75;
                var h = screen.height * 0.60;
                var print = window.open(url,'print',
                    'toolbar=no,width='+w+',height='+h+',scrollbars=yes,' +
                    'top=0,left=0,statusbar=yes,resizeable=yes');
            },
            doPrintFile: function (id){
                var ok = confirm(this.i18n.PRINT_FILE);
                if (ok) {
                    this.doPostBack(id);
                }
            },
            doShowPDF: function (id){
                var ok = confirm(this.i18n.SHOW_PDF);
                if (ok){
                    this.doPostBack(id);
                }
            },
            doWindow: function (url, target) {
                if ((target == null) || (target == '')) {
                    target = 'managerWindow';
                }
                var w = screen.width * 0.95;
                var h = screen.height * 0.80;
                var wnd = window.open(url,target,
                    'toolbar=no,width='+w+',height='+h+',scrollbars=yes,' +
                    'top=0,left=0,statusbar=yes,resizeable=yes');
            },
            doFile: function (url, fileName) {
                url = url + '?filename=' + (fileName ? fileName : 'download');
                window.location.replace(url);
            },
            doPrintURL: function (url) {
                var ok = confirm(this.i18n.PRINT_URL);
                if (ok) {
                    var tg = window.name;
                    var form = document.forms[0];
                    var w = screen.width * 0.95;
                    var h = screen.height * 0.80;
                    var print = window.open(url,'print',
                        'toolbar=no,width='+w+',height='+h+',scrollbars=yes,' +
                        'top=0,left=0,statusbar=yes,resizeable=yes');
                    print.focus();
                    window.print();
                    form.target=tg;
                }
            },
            doPrompt: function(idPrompt, html) {
                var windowPrompt = registry.byId(idPrompt);
                if (!windowPrompt) {
                    windowPrompt = new DialogSimple({
                        id:idPrompt
                    });
                }
                if (html){
                    windowPrompt.set('content', html);
                }
                windowPrompt.show();
            },
            hover: function(id, over, out){
                var element = this.byId(id);
                on(element,'onmouseenter', over);
                on(element,'onmouseleave', out);
            },
            hide: function(id) {
                if( domStyle.get(this.byId(id), "display") != "none"){
                    domStyle.set(this.byId(id), "display", "none");
                }
            },
            show: function(id) {
                if( domStyle.get(this.byId(id), "display") == "none"){
                    domStyle.set(this.byId(id), "display", "block");
                }
            },
            toggle: function(id) {
                if( domStyle.get(this.byId(id), "display") == "none"){
                    domStyle.set(this.byId(id), "display", "block");
                } else {
                    domStyle.set(this.byId(id), "display", "none");
                }
            }
        };
    });