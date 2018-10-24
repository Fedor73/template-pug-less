'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const fileinclude          = require('gulp-file-include');
const uglify               = require('gulp-uglify');
const sourcemaps           = require('gulp-sourcemaps');
const config               = require('../../../config');
const browsersync          = require('browser-sync');

var reload = browsersync.reload;

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        // jquery делаем отдельно чтобы подключить его в head
        gulp.src(config.js.srcJquery)
            .pipe(gulp.dest(config.js.destJquery));

        // html5shiv делаем отдельно чтобы подключить его в head
        gulp.src(config.js.srcHtml5shiv)
            .pipe(gulp.dest(config.js.destHtml5shiv));

        // html5shiv делаем отдельно чтобы подключить его в head
        gulp.src(config.js.srcNormalize)
            .pipe(gulp.dest(config.js.destNormalize));

        return gulp.src(config.js.srcExternal)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file',
                indent: true
            }).on('error', error))
            .pipe(uglify().on('error', error))
            .pipe(gulp.dest(config.js.dest))
    });
};