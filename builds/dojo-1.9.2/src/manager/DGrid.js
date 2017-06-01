define("manager/DGrid", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json",  "dojo/_base/Deferred", "dojo/parser", "dojo/aspect",
    "dojo/dom-construct", "dojo/dom-class", "dojo/store/Memory", "dojo/store/JsonRest", "dijit/registry", "dojo/store/util/QueryResults", "dojo/store/Observable","dojo/store/Cache",
    "dgrid/Grid", "dgrid/OnDemandGrid", "dgrid/extensions/Pagination"],
        function(declare, lang, array, json, Deferred, parser, aspect, domConstruct, domClass, Memory, JsonRest, registry, QueryResults, Observable, Cache, Grid, OnDemandGrid, Pagination) {
            return declare("Manager.DGrid", [], {
                constructor: function(name, firstIndex, dgridType) {
                    this.name = name;
                    this.firstIndex = firstIndex;
                    this.data = null;
                    this.columns = null;
                    this.widgets = [];
                    this.dgrid = null;
                    this.dgridType = dgridType;
                    this.store = null;
                    this.arrayData = [];
                    this.arrayColumns = [];
                    this.actionData = '';
                },
                startup: function() {
                    array.forEach(this.data, lang.hitch(this, function(row, i) {
                        var o = {};
                        var id = i + this.firstIndex;
                        var arr = array.map(row, function(item, index) {
                            o['id'] = id;
                            o['widgets'] = [];
                            o['field' + index] = item;
                        });
                        this.arrayData[i++] = o;
                    }));
                    //this.store = new Memory({ idProperty: 'id', data: this.arrayData });
                    this.store = Observable(Cache(JsonRest({
                        baseTarget: this.actionData,
                        idProperty: 'idPessoa',
                        query: function(query, options) {
                            var results, def, promisedResults;
                            console.log(options);
                            this.target = this.baseTarget + '?start=' + options.start + '&count=' + options.count;
                            var r = JsonRest.prototype.query.call(this, query, options);
                            return r;
                        }
                        /*
                        baseTarget: this.actionData,
                        query: function(query, options) {
                            var results, def, promisedResults;
                            console.log('options');
                            console.log(options);
                            this.target = this.baseTarget + '?start=' + options.start + '&count=' + options.count;
                            results = JsonRest.prototype.query.apply(this, arguments);
                            def = new Deferred();
                            setTimeout(function() {
                                def.resolve(results);
                            }, 200);
                            promisedResults = QueryResults(def.promise);
                            promisedResults.total = results.total;
                            //console.log('total=' + results.total);
                            //promisedResults.forEach(function(item){console.log(item);});
                            //console.log(promisedResults);
                            return promisedResults;
                        }
                        */
                   }), Memory()));  
					this.store.getChildren = function(parent, options){
                                            console.log('=======================');
						return this.store.query({parent: parent.id}, options);
					};                    
                    var arr = array.map(this.columns, lang.hitch(this, function(item, i) {
                        var child = domConstruct.toDom(item.label);
                        this.arrayColumns[i] = {
                            label: item.label,
                            field: item.field,
                            className: item.className,
                            sortable: item.sortable,
                            renderHeaderCell: function(node) {
                                if (item.label.charAt(0) == '<') {
                                    var child = domConstruct.toDom(item.label);
                                    domConstruct.place(child, node);
                                    parser.parse(node);
                                } else {
                                    node.appendChild(document.createTextNode(item.label));
                                }
                            } ,
                            renderCell: function(object, value, node) {
                        //console.log(item.field + ' - ' + value);/*
                                    node.appendChild(document.createTextNode(value));
/*
                                if (value.charAt(0) == '<') {
                                    var child = domConstruct.toDom(value);
                                    object.widgets.push(child.id);
                                    domConstruct.place(child, node);
                                } else {
                                    node.appendChild(document.createTextNode(value));
                                }
  */                              
                            }
                           
                        };
                    }));
                    if (this.dgridType == 'demand') {
                        this.dgridOnDemand();
                    } else {
                        this.dgridPagination();
                    }
                },
                dgridOnDemand: function() {
                    console.log('demand');
                    this.dgrid = new OnDemandGrid({}, this.name);
                    /*
                    aspect.after(this.dgrid, "renderArray", function(object) {
                        for (var i = 0; i < object.length; i++) {
                            parser.parse(object[i].id);
                        }
                        return object;
                    });
                    aspect.before(this.dgrid, "renderRow", function(object) {
                        for (var i = 0; i < object.widgets.length; i++) {
                            var widget = registry.byId(object.widgets[i]);
                            if (widget) {
                                widget.destroyRecursive();
                            }
                        }
                    }, true);
                    */
                    this.dgrid.set('minRowsPerPage', 16);
                    this.dgrid.set('store', this.store);
                    this.dgrid.set('columns', this.arrayColumns);
                    this.dgrid.startup();
                },
                dgridPagination: function() {
                    var CustomGrid = declare([Grid, Pagination]);
                    this.dgrid = new CustomGrid({
                        pagingLinks: 1,
                        pagingTextBox: true,
                        firstLastArrows: true,
                        pageSizeOptions: [10, 15, 25]
                    }, this.name);
                    aspect.after(this.dgrid, "renderArray", function(object) {
                        for (var i = 0; i < object.length; i++) {
                            parser.parse(object[i].id);
                        }
                        return object;
                    });
                    aspect.before(this.dgrid, "renderRow", function(object) {
                        for (var i = 0; i < object.widgets.length; i++) {
                            var widget = registry.byId(object.widgets[i]);
                            if (widget) {
                                widget.destroyRecursive();
                            }
                        }
                    }, true);
                    this.dgrid.set('store', this.store);
                    this.dgrid.set('columns', this.arrayColumns);
                    this.dgrid.startup();
                }
            });
        });

