'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const config        = require('../../../config');
const realFavicon   = require('gulp-real-favicon');
const fs            = require("fs");


module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        // Check for updates on RealFaviconGenerator (think: Apple has just
        // released a new Touch icon along with the latest version of iOS).
        // Run this task from time to time. Ideally, make it part of your
        // continuous integration system.
        var currentVersion = JSON.parse(fs.readFileSync(config.favicon.json)).version;
        realFavicon.checkForUpdates(currentVersion, function(err) {
            if (err) {
                throw err;
            }
        });
    });
};