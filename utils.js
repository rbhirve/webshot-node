var path = require('path');

var Utils = {
	id:function(){
		var ret = '';
		for(var chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_".split(''),i=0;i<75;i++){
			ret += chars[~~(Math.random() * chars.length)];
		}
		return ret;
	},
	resolveRelativeURL:function(p,url){
		var proto = url.match(/^https?/)[0]; //extract the protocol out
		url = url.replace(/^https?:\/\//,''); //remove the protocol
		return proto+'://'+path.normalize(url+'/'+p) //find out the absolute URL
				.replace(path.sep,'/') //replace blackslash with forward slash in Windows
				.replace(/#(\w)+/,''); //remove URL fragment
	},
	isExternal:function(url){
		return url.match(/^https?/) !== null;
	},
	imageRegexp: new RegExp("("+['\\.png','\\.jpg','\\.gif','\\.bmp','\\.psd'].join('|')+")$","i")
};

module.exports = Utils;