'use strict';

const $       = require('gulp-load-plugins')();
const gulp    = require('gulp');
const config  = require('../../../config');
const Promise = require('bluebird');
const fs      = require("fs");

var PLUGIN_NAME = 'kontora-htmllist';

/*
 * Build index.html
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        var build_path     = __dirname + "/../../../../src/";
        var files_list     = [];
        var index_template = __dirname + '/../../../template/index.pug';

        var promises = fs.readdirSync(build_path).map(function (file) {
            fs.stat(build_path + file, function (err, stats) {
                if (err) {
                    return console.error(err);
                }

                if (stats.isFile() && file != 'index.pug') {
                    files_list.push(file.replace('pug', 'html'));
                }
            });
        });

        Promise.all(promises).then(function() {
            gulp.src(index_template)
                .pipe($.consolidate('lodash', {
                    files: files_list,
                    names: [],
                    path:  "/"
                }))
                .pipe(gulp.dest('src/'));
        });

        success();
        /*
         * TODO (murdoc): Переписать вот так вот - красивее
         * Не будут использоваться Promise
         */

        // var build_path = __dirname + "/../../../src/";
        // var index_template = __dirname + '/../../template/index.pug';

        // gulp.src(index_template)
        //     .pipe($.consolidate('lodash', {
        //         files: fs.readdirSync(build_path).map(function (file) {
        //             fs.stat(build_path + file, function (err, stats) {
        //                 if (err) { return console.error(err); }

        //                 if (stats.isFile() && file != 'index.pug') {
        //                     return file.replace('pug', 'html');
        //                 }
        //             });
        //         }),
        //         path: "http://localhost:3000/"
        //     }))
        //     .pipe(gulp.dest('src/'));

    });
};