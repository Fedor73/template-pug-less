'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const fileinclude          = require('gulp-file-include');
const uglify               = require('gulp-uglify');
const sourcemaps           = require('gulp-sourcemaps');
const config               = require('../../../config');
const browsersync          = require('browser-sync');
const concat               = require('gulp-concat');


var reload = browsersync.reload;

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {

        return gulp.src(config.js.srcInternalExternal)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file',
                indent: true
            }).on('error', error))
            // .pipe(sourcemaps.init())
            .pipe(concat('assets.js'))
            .pipe(uglify().on('error', error))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.js.dest))
    });
};