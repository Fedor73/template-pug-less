'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');

/*
 * Build js
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src(config.json.src)
            .pipe(gulp.dest(config.json.dest));
    });
};