'use strict';

const $         = require('gulp-load-plugins')();
const gulp      = require('gulp');
const configDev = require('../config');
const config    = require('../../../config');

/*
 * Смотрим за изменениями
 */
module.exports = function(options) {
    return function() {
        // $.watch([configDev.watch.html], gulp.series('pug', 'webserver-reload'));
        global.watch = true;
        $.watch([configDev.watch.html], gulp.series('addInc2pug','emitty-scan', 'webserver-reload'))
        .on('all', (event, filepath) => {
            console.log(filepath);
            global.emittyChangedFile = filepath;
        });

        $.watch(config.less.bemblocks + '*/*.mobile.less', gulp.series('dev:concat-mobile', 'dev:less-compile'));

        $.watch(configDev.watch.less, gulp.series('dev:less-compile'));

        $.watch(configDev.watch.json, gulp.series('json'));

        // $.watch(configDev.watch.bower, gulp.series('bower-requirejs', 'dev:js'));

        $.watch(configDev.watch.srcExternal, gulp.series('js-external', 'webserver-reload'));
        $.watch(configDev.watch.srcInternal, gulp.series('js-internal', 'webserver-reload'));

        $.watch(configDev.watch.images, gulp.series('dev:images'));

        $.watch([configDev.watch.fonts], gulp.series('fonts'));

        $.watch(configDev.watch.otherfiles, gulp.series('otherfiles'));

        $.watch(configDev.watch.icons, gulp.series('iconfont'));
        $.watch(configDev.watch.icons, gulp.series('iconlist'));
    };
};