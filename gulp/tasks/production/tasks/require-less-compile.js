'use strict';

const $       = require('gulp-load-plugins')();
const gulp    = require('gulp');
const config  = require('../../../config');
const through = require('through2').obj;
const path    = require('path');

const lessPluginAutoPrefix = require('less-plugin-autoprefix');
const lessPluginCleanCSS   = require('less-plugin-clean-css');

var autoprefixer = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss     = new lessPluginCleanCSS({ advanced: true });

// concate styles for version
module.exports = function(options) {
    return function() {
        //Создаем css файл
        return gulp.src('build/*.html')
            .pipe(through(function(file, enc, cb) {
                var f = path.parse(file.path);
                var curFileName = f.name;
                var less_template = __dirname + '/../../../template/main.less';

                gulp.src(less_template)
                    .pipe($.consolidate('lodash', {
                        lessFileName: curFileName
                    }))
                    .pipe($.less({
                        plugins: [autoprefixer, cleancss],
                    }))
                    .pipe($.csscomb())
                    .pipe($.csso())
                    .pipe($.rename(curFileName + '.css'))
                    .pipe(gulp.dest('build/css/'));

                cb();
            }))
            .pipe(gulp.dest('build/'));
    }
};