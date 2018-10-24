'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');
const lessPluginAutoPrefix = require('less-plugin-autoprefix');
const lessPluginCleanCSS   = require('less-plugin-clean-css');

var autoprefixer = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss     = new lessPluginCleanCSS({ advanced: true });

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src(config.ieless.src)
            .pipe($.less({
                plugins: [autoprefixer, cleancss],
            }).on('error', error))
            .pipe($.csso())
            .pipe($.csscomb())
            .pipe(gulp.dest(config.ieless.dest));
    });
};