'use strict';

const gulp        = require('gulp');
const configDev   = require('../config');
const browsersync = require('browser-sync');

/*
 * Запуск вебсервера BrowserSync
 */
module.exports = function(options) {
    return function(callback) {
        browsersync(configDev.browsersync);
    }
};