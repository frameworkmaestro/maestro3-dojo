require({cache:{
'url:manager/templates/Dialog.html':"<div class=\"mBoxPaneDialog mElement\" role=\"dialog\" aria-labelledby=\"${id}_title\"  cleanContent=\"true\">\n    <div >\n\t<span></span>\n\t<span dojoAttachPoint=\"closeButtonNode\"></span>\n    </div>  \n<div  id=\"${id}_container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"}});
define("manager/Dialog", [
    "dojo/_base/declare", 
    "dojo/_base/window",
	"dojo/_base/lang",
	"dojo/aspect",
    "dojo/dom-geometry",
    "dojo/query", 
    "dojo/has",    
    "dojo/topic",    
    "dojo/dom-class",    
    "dojo/dom-style",    
    "dijit/Dialog",
    "dojo/dnd/Moveable",    
    "manager/ElementPane",
    "dojo/text!./templates/Dialog.html"
    ], function(declare, window, lang, aspect, domGeom, query, has, topic, domClass, domStyle, Dialog, Moveable, ElementPane, template){
        return declare("Manager.Dialog",
            [Dialog, ElementPane], {

                widgetsInTemplate: true,
                templateString: template,
                enableDrag: function(){
                    var node = this.domNode;
                    var nodeList = query(" > form div div *", this.containerNode.id);
                    var titleBar = nodeList.shift();
					if(titleBar && this.draggable){
						this._moveable = new ((has("ie") == 6) ? TimedMoveable // prevent overload, see #5285
							: Moveable)(node, { handle: titleBar });
						aspect.after(this._moveable, "onMoveStop", lang.hitch(this, "_endDrag"), true);
					}else{
						domClass.add(node, "dijitDialogFixed");
					}
                }
/*
                position: function(){
                    // summary:
                    //		Position modal dialog in the viewport. If no relative offset
                    //		in the viewport has been determined (by dragging, for instance),
                    //		center the node. Otherwise, use the Dialog's stored relative offset,
                    //		and position the node to top: left: values based on the viewport.
                    // tags:
                    //		private
                    if(!domClass.contains(window.body(),"dojoMove")){
                        var node = this.domNode,
                        viewport = window.getBox(),
                        p = this._relativePosition,
                        bb = p ? null : domGeom.position(node),
                        l = Math.floor(viewport.l + (p ? p.x : (viewport.w - bb.w) / 2)),
                        t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2))
                        ;
                        domStyle.add(node,{
                            left: l + "px",
                            top: t + "px"
                        });
                    }
                }
*/
            })
    });
