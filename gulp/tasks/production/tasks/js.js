'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');

/*
 * Build js
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        // jquery for head
        gulp.src(config.js.srcJquery)
            .pipe(gulp.dest(config.js.destJquery));

        // html5shiv for head
        gulp.src(config.js.srcHtml5shiv)
            .pipe(gulp.dest(config.js.destHtml5shiv));

        // Normalize for head
        // gulp.src(config.js.srcNormalize)
        //     .pipe(gulp.dest(config.js.destNormalize));

        gulp.src(config.js.src)
            .pipe($.if(!config.js.requireJs, $.concat('internal.js'))) // if not RequireJS - do not concat
            .pipe($.if(!config.js.requireJs, $.fileInclude({
                prefix:   '@@',
                basepath: '@file',
                indent:   true
            }).on('error', error)))
            .pipe($.if(config.js.requireJs, $.filter(['!' + config.base + 'js/node_modules/**/*.*'], {restore: true}).restore))
            .pipe($.uglify().on('error', error))                       // minify
            .pipe(gulp.dest(config.js.dest));

        success();
    });
};