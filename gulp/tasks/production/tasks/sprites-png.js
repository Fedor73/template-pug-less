'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');

/*
 * Generate srite and it's styles
 */
module.exports = function(options) {
    return function(callback) {
        var spriteData = gulp.src(config.sprites.src2, { read: false })
            .pipe($.spritesmith(config.sprites.options2));

        spriteData.img.pipe(gulp.dest(config.sprites.dest.image));

        var spriteData = gulp.src(config.sprites.src, { read: false })
            .pipe($.spritesmith(config.sprites.options));

        spriteData.img.pipe(gulp.dest(config.sprites.dest.image));
        spriteData.css.pipe(gulp.dest(config.sprites.dest.css));

        callback();
    }
};