'use strict';

const $           = require('gulp-load-plugins')();
const gulp        = require('gulp');
const config      = require('../../../config');

/*
 * Build jade
 */
// module.exports = function(options) {
//     return function() {
//         return gulp.src('src/**/*.jade')
//             .pipe($.changed(config.jade.dest, {extension: '.html'}))
//             // .pipe($.if(global.isWatching, $.cached('jade')))
//             .pipe($.jadeInheritance({basedir: config.base})).on('error', $.notify.onError(function(err) {
//                 return {
//                     title: 'Jade',
//                     message: err
//                 };
//             }))
//             .pipe($.filter(function (file) {
//                return !/\//.test(file.relative);
//             }))
//             .pipe($.jade())
//             .on('error', $.notify.onError(function(err) {
//                 return {
//                     title: 'Jade',
//                     message: err
//                 };
//             }))                                    // generate HTML
//             .pipe($.if(config.jade.expand, $.htmlPrettify({
//                 brace_style:       'expand',
//                 indent_size:       1,
//                 indent_char:       '    ',
//                 indent_inner_html: true,
//                 preserve_newlines: true
//             })))
//             .pipe(gulp.dest(config.jade.dest));
//     };
// };

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src('src/*.jade')
            .pipe($.jade())                                    // generate HTML
            // .pipe($.cleanhtml())                               // delete comments
            .pipe($.if(config.jade.expand, $.htmlPrettify({
                brace_style:       'expand',
                indent_size:       1,
                indent_char:       '    ',
                indent_inner_html: true,
                preserve_newlines: true
            })))                                               // expand/collapse
            .pipe(gulp.dest(config.jade.dest));
    });
};