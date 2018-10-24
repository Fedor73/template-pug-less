'use strict';

const gulp                 = require('gulp');
const config               = require('../../../config');

/*
 * Copy other files (.php .ico etc)
 */
module.exports = function(options) {
    return function() {
        return gulp.src(config.other.src)
            .pipe(gulp.dest(config.build));
    };
};