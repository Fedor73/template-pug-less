'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');
const browsersync          = require('browser-sync');

var reload = browsersync.reload;
/*
 * Build js
 */
module.exports = function(options) {
    return function(callback) {
        // jquery for head
        gulp.src(config.js.srcJquery)
            .pipe(gulp.dest(config.js.destJquery));

        // html5shiv for head
        gulp.src(config.js.srcHtml5shiv)
            .pipe(gulp.dest(config.js.destHtml5shiv));

        // Normalize for head
        // gulp.src(config.js.srcNormalize)
        //     .pipe(gulp.dest(config.js.destNormalize));

        gulp.src([config.js.src, '!' + config.base + 'js/node_modules/**/*.*'])
            // .pipe($.if(!config.js.requireJs, $.concat('internal.js'))) // if not RequireJS - do not concat
            // .pipe($.fileInclude({
            //     prefix:   '@@',
            //     basepath: '@file',
            //     indent:   true
            // }).on('error', error))
            // .pipe($.debug({title: 'js'}))
            // .pipe($.uglify()).on('error', $.notify.onError(function(err) {
            //     return {
            //         title: 'Styles',
            //         message: err.message
            //     };
            // }))
            .pipe($.changed(config.js.dest, {extension: '.js'}))
            // .pipe($.debug({title: 'changed'}))
            .pipe(gulp.dest(config.js.dest))
            .pipe($.if(global.isWatching, reload({stream:true})));
        callback();
    };
};