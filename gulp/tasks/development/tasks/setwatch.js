'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');
const rimraf = require('rimraf');

/*
 * Delete build directory
 */
module.exports = function(options) {
    return function(callback) {
        global.isWatching = true;
        callback();
    }
};