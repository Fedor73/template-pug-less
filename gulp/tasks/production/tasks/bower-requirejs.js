'use strict';

const gulp           = require('gulp');
const bowerRequireJS = require('bower-requirejs');
const config    	 = require('../../../config');

module.exports = function(options) {
    return function(callback) {
		bowerRequireJS({
		    config:     'src/js/config.js',
		    exclude:    ['jquery'],
		    transitive: false
		});
		gulp.src(config.bower)
            .pipe(gulp.dest(config.js.dest + 'node_modules/'));

		callback();
    }
};