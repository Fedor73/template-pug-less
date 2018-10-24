'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');

/*
 * Copy fonts
 */
module.exports = function(options) {
    return function() {
        return gulp.src(config.fonts.src, { since: gulp.lastRun(options.taskName) })
            .pipe($.newer(config.fonts.dest))
            .pipe(gulp.dest(config.fonts.dest));
    }
};