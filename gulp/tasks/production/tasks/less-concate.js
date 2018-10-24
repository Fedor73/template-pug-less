'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');

// concate styles for version
module.exports = function(options) {
    return function() {
        return gulp.src(config.less.bemblocks + options.lessName)
	        .pipe($.concat(options.concatName))
	        .pipe(gulp.dest(config.less.concatless));
    }
};