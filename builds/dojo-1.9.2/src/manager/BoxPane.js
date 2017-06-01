require({cache:{
'url:manager/templates/BoxPane.html':"<div class=\"mBoxPane\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"mBoxPaneTitleBar ${classTitle}\" id=\"${id}_titleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"mBoxPaneTitle\" id=\"${id}_title\"></span>\n\t<div data-dojo-attach-point=\"toolBarNode\" class=\"mBoxPaneToolBar\"></div>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"mBoxPaneContent\"></div>\n</div>\n"}});
define("manager/BoxPane", [
    "dojo/_base/declare",
    "dojox/layout/ContentPane",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_CssStateMixin",
    "dijit/form/_FormMixin",
    "dojo/text!./templates/BoxPane.html"
    ], function(declare, ContentPane, _Widget, _TemplatedMixin, _CssStateMixin, _FormMixin, template){
        return declare("Manager.BoxPane",
            [ContentPane, _Widget, _TemplatedMixin, _FormMixin, _CssStateMixin], {
                templateString: template,
                baseClass: "mBoxPane",
                classTitle: "",
                toolBar: "",
                cssStateNodes: {
                    toolBarNode: "toolIcon"
                },
                focus: function() {
                },
                attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
                    title: [
                    {
                        node: "titleNode", 
                        type: "innerHTML"
                    },
                    {
                        node: "titleBar", 
                        type: "attribute"
                    }
                    ],
                    "aria-describedby":""
                }),
                onCancel: function() {
                },
                startup: function(){
                    if (this.toolBar != '') {
                        this.toolBarNode.appendChild(dojo.byId(this.toolBar));
                    }
                    this.inherited(arguments);
                }
            })
});
