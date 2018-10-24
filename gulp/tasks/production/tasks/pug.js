'use strict';

const $        = require('gulp-load-plugins')();
const gulp     = require('gulp');
const config   = require('../../../config');

/*
 * Build pug
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src(config.pug.src)
            .pipe($.pug())                                    // generate HTML
            .pipe($.cleanhtml())                               // delete comments
            .pipe($.if(config.pug.expand, $.htmlPrettify({
                brace_style:       'expand',
                indent_size:       1,
                indent_char:       '    ',
                indent_inner_html: true,
                preserve_newlines: true
            })))                                               // expand/collapse
            .pipe(gulp.dest(config.pug.dest));
    });
};