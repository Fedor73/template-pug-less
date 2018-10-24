'use strict';

const gulp     = require('gulp');
const config   = require('../../../config');
var   ts         = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
/*
 * build TrueScript
 */
module.exports = function(options) {
	return config.wrapPipe(function(success, error) {
        return gulp.src(['src/angular/*.ts','src/angular/*/*.ts','typings/index.d.ts'])
            .pipe(ts(tsProject))
            .pipe(gulp.dest('build/app'));
    });
};