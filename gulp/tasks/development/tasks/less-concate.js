'use strict';

const $           = require('gulp-load-plugins')();
const gulp        = require('gulp');
const config      = require('../../../config');
const through2    = require('through2').obj;
const File        = require('vinyl');

// concate styles for version
module.exports = function(options) {
    return function() {
        const lessImports = [];
        return gulp.src(config.less.bemblocks + options.lessName)
            .pipe(through2(
            	function(file, enc, callback) {
	            	lessImports.push('@import ' + '"../bem-blocks/' + file.relative + '";');
	            	callback();
	            },
	            function(callback) {
	            	let lessFile = new File({
	            		contents: new Buffer(lessImports.join('\n'), 'utf-8'),
	            		base: '',
	            		path: options.concatName
	            	});
	            	this.push(lessFile);
	            	callback();
	            }
	        ))
            .pipe(gulp.dest(config.less.concatless));
    }
};