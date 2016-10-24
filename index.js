/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Paul Aeria
*/
var loaderUtils = require("loader-utils");
var mixinRegex = /mixin[ ]+([\w\-\_]+)/;

function generateCode(source, mixinName) {
	return source + '\n+' + mixinName + '(locals)';
}

module.exports = function(source) {
	this.cacheable && this.cacheable();
	var config = loaderUtils.getLoaderConfig(this);

	// find predefined mixin name
	if(config.mixin) {
		return generateCode(source, config.mixin);
	}

	// get mixin name from source
	var result = source.match(mixinRegex);
	if(result[1]) {
		return generateCode(source, result[1]);
	}

	throw new Error('Mixin name not found');
};
