'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');
const lessPluginAutoPrefix = require('less-plugin-autoprefix');
const lessPluginCleanCSS   = require('less-plugin-clean-css');
const browsersync          = require('browser-sync');

var autoprefixer = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss     = new lessPluginCleanCSS({ advanced: true }),
    reload       = browsersync.reload;

module.exports = function(options) {
    return function(callback) {
        gulp.src(config.less.src)
            .pipe($.sourcemaps.init())
            .pipe($.less({
                plugins: [
                    cleancss,
                    autoprefixer
                ]
            })).on('error', $.notify.onError(function(err) {
                return {
                    title: 'Styles',
                    message: err.message
                };
            }))
            // .pipe($.csscomb())
            .pipe($.csso())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.less.dest))
            .pipe($.if(global.isWatching, reload({stream:true})));
        callback();
    };
};