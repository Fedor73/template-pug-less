'use strict';

const $       = require('gulp-load-plugins')();
const gulp    = require('gulp');
const config  = require('../../../config');
const Promise = require('bluebird');
const fs      = require("fs");

var PLUGIN_NAME = 'kontora-iconlist';

/*
 * Build index.html
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        var build_path     = __dirname + "/../../../../src/images/svg_for_icon/";
        var files_list     = [];
        var index_template = __dirname + '/../../../template/iconlist.pug';

        var promises = fs.readdirSync(build_path).map(function (file) {
            fs.stat(build_path + file, function (err, stats) {
                if (err) {
                    return console.error(err);
                }

                if (stats.isFile() && file != 'iconlist.pug') {
                    files_list.push(file.replace('.svg', ''));
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

    });
};