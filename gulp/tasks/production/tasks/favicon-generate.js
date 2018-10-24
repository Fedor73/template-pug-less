'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const config        = require('../../../config');
const realFavicon   = require('gulp-real-favicon');
const fs            = require("fs");


module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        // Generate the icons. This task takes a few seconds to complete.
        // You should run it at least once to create the icons. Then,
        // you should run it whenever RealFaviconGenerator updates its
        // package (see the check-for-favicon-update task below).
        realFavicon.generateFavicon({
            masterPicture: config.favicon.masterPicture,
            dest: config.favicon.dest,
            iconsPath: config.favicon.iconsPath,
            design: {
                ios: {
                    pictureAspect: 'noChange',
                    assets: {
                        ios6AndPriorIcons: false,
                        ios7AndLaterIcons: false,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true
                    }
                },
                desktopBrowser: {},
                windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#da532c',
                    onConflict: 'override',
                    assets: {
                        windows80Ie10Tile: false,
                        windows10Ie11EdgeTiles: {
                            small: false,
                            medium: true,
                            big: false,
                            rectangle: false
                        }
                    }
                },
                androidChrome: {
                    pictureAspect: 'shadow',
                    themeColor: '#ffffff',
                    manifest: {
                        display: 'standalone',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    },
                    assets: {
                        legacyIcon: false,
                        lowResolutionIcons: false
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'blackAndWhite',
                    threshold: 50,
                    themeColor: '#5bbad5'
                }
            },
            settings: {
                scalingAlgorithm: 'Mitchell',
                errorOnImageTooSmall: false
            },
            markupFile: config.favicon.json
        }, function() {
            success();
        });
    });
};