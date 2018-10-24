'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const config        = require('../../../config');
const realFavicon   = require('gulp-real-favicon');
const fs            = require("fs");


module.exports = function(options) {
    return config.wrapPipe(function(success, error) {

        // Inject the favicon markups in your HTML pages. You should run
        // this task whenever you modify a page. You can keep this task
        // as is or refactor your existing HTML pipeline.
        return gulp.src(['build/*.html'])
            .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.favicon.json)).favicon.html_code))
            .pipe(gulp.dest(config.favicon.destInject));
    });
};