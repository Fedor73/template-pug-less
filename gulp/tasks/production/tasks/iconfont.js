'use strict';

const $      = require('gulp-load-plugins')();
const gulp   = require('gulp');
const config = require('../../../config');

var runTimestamp = Math.round(Date.now() / 1000),
    fontName     = config.iconfont.fontName;

/*
 * Build icon fonts
 */
module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src(config.iconfont.src)
            .pipe($.iconfontCss({
                fontName:   fontName,
                path:       'node_modules/gulp-iconfont-css/templates/_icons.less',
                targetPath: '../../src/style/partials/icons.less',
                fontPath:   '../fonts/'
            }))
            .pipe($.iconfont({
                fontName:      fontName,
                appendUnicode: true,
                formats:       ['ttf', 'eot', 'woff', 'svg', 'woff2'],
                timestamp:     runTimestamp,
                normalize:     true,
                fontHeight:    1001,
            }))
            .pipe(gulp.dest(config.iconfont.dest));
    });
};