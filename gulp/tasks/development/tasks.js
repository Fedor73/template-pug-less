'use strict';

const gulp = require('gulp');
const config  = require('../../config');

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

// icons to font from production
lazyRequireTask('iconfont', '../production/tasks/iconfont');

// Favicons from production
lazyRequireTask('favicon-check-for-updates', '../production/tasks/favicon-check-for-updates');
lazyRequireTask('favicon-generate', '../production/tasks/favicon-generate');
lazyRequireTask('favicon-inject-markups', '../production/tasks/favicon-inject-markups');
gulp.task('favicon', gulp.parallel('favicon-check-for-updates', 'favicon-generate', 'favicon-inject-markups'));

// images from production
lazyRequireTask('dev:images', './tasks/images');

// jade to html from DEV
// lazyRequireTask('dev:jade', './tasks/jade');
// pug to html from DEV
// lazyRequireTask('pug', '../production/tasks/pug');

// lazyRequireTask('emitty', '../production/tasks/emitty');

const gulpif   = require('gulp-if');
const pug      = require('gulp-pug');
const emitty   = require('emitty').setup('src', 'pug');
gulp.task('emitty', () =>
    new Promise((resolve, reject) => {
        emitty.scan(global.emittyChangedFile).then(() => {
            gulp.src('src/*.pug')
                .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe(pug({ pretty: true ,basedir: __dirname}))
                .pipe(gulp.dest(config.pug.dest))
                .on('end', resolve)
                .on('error', reject);
        });
    })
);

gulp.task('emitty-scan', () =>
    new Promise((resolve, reject) => {
        //console.log(global.emittyChangedFile);
        emitty.scan(global.emittyChangedFile).then(() => {
            gulp.src('src/*.pug')
            .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe(pug({ pretty: true }))
                .pipe(gulp.dest(config.pug.dest))
                .on('end', resolve)
                .on('error', reject);
        });
    })
);

// less foe ie only from production
lazyRequireTask('ieless', '../production/tasks/ieless');

// copy bower folder to build in requireJS is true // prod
lazyRequireTask('bower-requirejs', '../production/tasks/bower-requirejs');
// generate js if requireJS is true // DEV
lazyRequireTask('dev:js', './tasks/js');
// combine tasks to only for requireJS // DEV
gulp.task('dev:js-require', gulp.parallel('bower-requirejs', 'dev:js'));

// external js from bower to only file if requireJS is false // prod
lazyRequireTask('js-external', '../production/tasks/js-external');
// inner js to only file if requireJS is false // prod
lazyRequireTask('js-internal', '../production/tasks/js-internal');
// combine tasks to only for NOT requireJS // prod
gulp.task('js-norequire', gulp.parallel('js-external', 'js-internal'));

// copy json folder
lazyRequireTask('json', '../production/tasks/json');
// copy fonts folder
lazyRequireTask('fonts', '../production/tasks/fonts');

// fontmin
// lazyRequireTask('fontmin', './tasks/fontmin');

// Less

// Concate LESS for Desktop and Mobile
lazyRequireTask('dev:concat-mobile', './tasks/less-concate', {
    lessName:     '*/*.mobile.less',
    concatName:   'bem.mobile.less'
});

// lazyRequireTask('dev:concat-tablet', './tasks/less-concate', {
//     lessName:     '*/*.tablet.less',
//     concatName:   'bem.tablet.less'
// });

// lazyRequireTask('dev:concat-desktop', './tasks/less-concate', {
//     lessName:     '*/*.desktop.less',
//     concatName:   'bem.desktop.less'
// });

// lazyRequireTask('dev:concat-desktop-big', './tasks/less-concate', {
//     lessName:     '*/*.desktop.big.less',
//     concatName:   'bem.desktop.big.less'
// });

// Less compile
lazyRequireTask('dev:less-compile', './tasks/less-compile');

// Compile LESS to CSS
gulp.task('dev:less', gulp.series(
    gulp.parallel(
        'dev:concat-mobile'
    ),
    'dev:less-compile'
));

// delete build path // prod
lazyRequireTask('clean', '../production/tasks/clean');

// generate index.html for list of pages // prod
lazyRequireTask('htmllist', '../production/tasks/htmllist');
// generate iconlist.html for list of icons // prod
lazyRequireTask('iconlist', '../production/tasks/iconlist');

// copy files from root
lazyRequireTask('otherfiles', '../production/tasks/otherfiles');

// lazyRequireTask('dev:nodemod', './tasks/nodemod');

gulp.task('fonts-all', gulp.series(
    // 'fontmin',
    'fonts'
));

gulp.task('dev:compile',
    gulp.series(
        gulp.parallel(
            (config.main.iconfont ? 'iconfont' : 'sprites'),
            'dev:images',
            // 'pug',
            'emitty',
            (config.js.requireJs ? 'dev:js-require' : 'js-norequire'),
            'otherfiles',
            // 'ieless',
            'json'
        ),
        'fonts-all',
        'dev:less'
    )
);

//TODO: add testSystem task
gulp.task('dev:init', gulp.series(
    'htmllist',
    'iconlist'
    // 'dev:nodemod'
));

gulp.task('dev:build',
    gulp.series(
        'clean',
        gulp.parallel(
            'dev:compile',
            'dev:init'
        )
    )
);

lazyRequireTask('watch', './tasks/watch');

lazyRequireTask('setWatch', './tasks/setwatch');

lazyRequireTask('webserver', './tasks/webserver');

lazyRequireTask('webserver-reload', './tasks/webserver-reload');

gulp.task('dev', gulp.series(
    'setWatch',
    gulp.parallel(
        'dev:compile',
        'dev:init'
    ),
    gulp.parallel(
        'watch',
        'webserver'
    )
));


lazyRequireTask('cache-clear', './tasks/cache-clear');

lazyRequireTask('create-style', './tasks/create-style');

lazyRequireTask('addInc2pug', './tasks/addInc2pug');

lazyRequireTask('eslint', './tasks/eslint');

lazyRequireTask('color-create', './tasks/color-create');
