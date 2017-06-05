var profile = (function(){
	var copyOnly = function(filename, mid){
			return (/(.*)\.dev\.css$/.test(filename)) || (/scripts(.*)\.js$/.test(filename)) || (/^dijit\/resources\//.test(mid) && !/\.css$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

    return {
        resourceTags:{
            ignore: function(filename){
                return /\.less$/.test(filename)  || (/\.js$/.test(filename) && !/scripts(.*)\.js$/.test(filename)) ||  /\.json$/.test(filename);
            },
			test: function(filename, mid){
                return false;
            },
            copyOnly: function(filename, mid){
					return copyOnly(filename, mid);
            },
            amd: function(filename, mid){
				return false;
            }
		},

		trees:[
        [".", ".", /(\/\.)|(~$)/]
        ]
    };
})();
