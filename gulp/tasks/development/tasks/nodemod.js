'use strict';

const gulp   = require('gulp');
const config = require('../../../config');
const $      = require('gulp-load-plugins')();


module.exports = function(options) {
    return function() {
        return gulp.src(config.node.src)
            .pipe($.symlink.absolute(config.node.dest, {force: true}));
    }
};