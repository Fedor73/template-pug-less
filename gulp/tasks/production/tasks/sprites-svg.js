'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');

/*
 * Generate srite and it's styles
 */
module.exports = function(options) {
    return function(callback) {
        gulp.src(config.sprites.srcSvg)
            .pipe($.svgSprite({
                mode: {
                    css: { // Activate the «css» mode
                        bust:   false,
                        sprite: config.sprites.optionsSvg.imgPath,
                        render: {
                            less: {
                                dest: config.sprites.optionsSvg.cssPath
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest(config.sprites.dest.image));

            callback();
    }
};