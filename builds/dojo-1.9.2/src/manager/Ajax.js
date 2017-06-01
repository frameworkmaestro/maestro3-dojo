define("manager/Ajax", [
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/request",
    "dojo/request/iframe"
    ], function(declare, lang, request, iframe) {
        return declare("Manager.Ajax",[],{
            loading: "<img src=\"images/loading.gif\" border=\"0\" alt=\"\">",
            url: null,
            form: null,
            response_type: 'JSON',
            updateElement: null,
            parameters: null,
            content: null,
            remote_method: '',
            load:null,
            sync:false,
            constructor: function(obj) {
                if (obj.url) this.url = obj.url;
                if (obj.form) this.form = obj.form;
                if (obj.content) this.content = obj.content;
                if (obj.response_type) this.response_type = obj.response_type;
                if (obj.updateElement) this.updateElement = obj.updateElement;
                if (obj.parameters) this.parameters = obj.parameters;
                if (obj.remote_method) this.remote_method = obj.remote_method;
                if (obj.callback_function) this.callback_function = obj.callback_function;
                if (obj.load) this.load = obj.load;
                if (obj.sync) this.sync = obj.sync;
            },
            update: function (result, ioArgs) {
                manager.getElementById(this.updateElement).innerHTML = result;
            },
            error: function(error,ioArgs) {
                if (errDiv = manager.getElementById('stdout')){
                    console.log(ioArgs.xhr.responseTex);
                    errDiv.innerHTML = ioArgs.xhr.responseText;
                }
            },
            ioerror: function(error,ioArgs) {
                console.log('Error!');
                console.log(ioArgs);
                console.log(error);
            },
            getParameters: function() {
                var parameters = {};
                if (this.parameters != null) {
                    if (lang.isFunction(this.parameters)) {
                        parameters = this.parameters();
                        if (!lang.isObject(parameters)) {
                            parameters = {
                                __EVENTARGUMENT: parameters
                            };
                        }
                    } else {
                        parameters = this.parameters;
                    }
                }
                parameters.__ISAJAXCALL = 'yes';
                parameters.__EVENTTARGETVALUE = this.remote_method;
                parameters.ajaxResponseType = response_type;
                return parameters;
            },
            get: function() {
                var callback_function = this.callback_function ? this.callback_function : this.update;
                var response_type = this.response_type.toLowerCase();
                var goUrl = this.url ? this.url : manager.getCurrentURL();
                var ioArgs = {};
                ioArgs.args = {
                    query: this.getParameters(),
                    handleAs: response_type,
                    sync: this.sync
                }                        
                request.get(goUrl, ioArgs.args).then(function(data){
                    callback_function(data, ioArgs);
                });
            },
            call: function() {
                var response_type = this.response_type.toLowerCase();
                if (this.updateElement) {
                    this.update(this.loading);
                }
                var goUrl = this.url ? this.url : manager.getAction();
                var callback_function = this.callback_function ? this.callback_function : this.update;
				console.log(this.content);
                var ioArgs = {};
                if (this.form != null) {
                    this.content.ajaxResponseType = response_type;
                    ioArgs.args = {
                        form: this.form,
                        data: this.content,
                        content: this.content,
                        handleAs: response_type
                    }                        
                    if (manager.page.fileUpload == 'yes') {
                        console.log('Using iframe');
                        iframe.post(goUrl, ioArgs.args).then(function(data){
                            callback_function(data, ioArgs);
                        });
                    } else {
                        request.post(goUrl, ioArgs.args).then(function(data){
                            callback_function(data, ioArgs);
                        });
                    }
                } else {
                    ioArgs.args = {
                        updateElement: this.updateElement,
                        data: this.content,
                        content: this.content,
                        handleAs: response_type
                    }                        
                    request.post(goUrl, ioArgs.args).then(function(data){
                        callback_function(data, ioArgs);
                    });
                }
            }
        });
});