'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');
const bust                 = require('gulp-buster');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster({
    checksumLength: 32
    , random: true
});

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src([
                'build/css/main.css'
                , 'build/js/assets.js'
                , 'build/icons.svg'
            ])
            .pipe(cachebust.resources())
            .pipe(gulp.dest(config.assets.dest))
            .pipe(bust({
                formatter: function (items) {
                    var str = "{";

                    Object.keys(items).forEach(function (index, id, array) {
                        str = str + '"' + index.split('.')[2] + '":"' + index + '"' + ((id < array.length - 1)?',':'');
                    });

                    str += "}";

                    return str;
                },
                fileName: 'versions.json'
            }))
            .pipe(gulp.dest('.'));
    });
};