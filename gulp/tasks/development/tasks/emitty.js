/**
 * Created by biyk on 26.01.18.
 */

const gulpif   = require('gulp-if');
const pug      = require('gulp-pug');
const emitty   = require('emitty').setup('src', 'pug');
const config   = require('../../../config');
const gulp          = require('gulp');



module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return                    gulp.src('src/*.pug')
            .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
            .pipe(pug({ pretty: true ,basedir: __dirname}))
            .pipe(gulp.dest(config.pug.dest))
    });
};
