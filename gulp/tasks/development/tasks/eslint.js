/**
 * Created by biyk on 31.01.18.
 */

const gulp                  = require('gulp');
const eslint                = require('gulp-eslint');
var reporter                = require('eslint-html-reporter');
var path                    = require('path');
var fs                      = require('fs');
var gulpIf                  = require('gulp-if');

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

module.exports = function(options) {
    return function(callback) {
        // ESLint ignores files with "node_modules" paths.
        // So, it's best to have gulp ignore the directory as well.
        // Also, Be sure to return the stream from the task;
        // Otherwise, the task may end before the stream has finished.
        return gulp.src(['src/js/**/*.js', '!src/js/node_modules/**/*.*','!src/js/require.js', '!src/js/external/**/*.*'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
            .pipe(eslint({fix:true}))
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format('html', function(results) {
                fs.writeFileSync('build/report-results.html', results);
            }))
            .pipe(gulpIf(isFixed, gulp.dest('src/js/')))
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
    };
};