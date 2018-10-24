'use strict';

const $        = require('gulp-load-plugins')();
const gulp     = require('gulp');
const config   = require('../../../config');
const pngquant = require('imagemin-pngquant');

config.images.imagemin.use = [pngquant()];

/*
 * Compress images
 */
module.exports = function(options) {
	return config.wrapPipe(function(success, error) {
        return gulp.src(config.images.src)
            // .pipe($.imagemin(config.images.imagemin).on('error', error))
            .pipe(gulp.dest(config.images.dest));
    });
};