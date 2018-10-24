var build = 'build/',
    base = 'src/';

module.exports = {
    build: build,
    base: base,
    main: {
        requireJs: false,
        iconfont: true
    },
    other: {
        src: [base + '*.*', '!' + base + '*.pug'],
    },
    node: {
        src: 'node_modules/',
        dest: build + 'node_modules'
    },
    fonts: {
        src: base + 'fonts/**/*.*',
        dest: build + 'fonts/',
    },
    iconfont: {
        src: [base + 'images/svg_for_icon/*.svg', '!' + base + 'images/svg_for_icon/blank.svg'],
        dest: build + 'fonts/',
        fontName: 'icons'
    },
    favicon: {
        masterPicture: base + 'images/favicon/master-favicon.png', //картинка, из которой делаются иконки
        iconsPath: '/images/favicon', // куда делаются иконки
        json: base + 'json/faviconData.json', //путь до json
        dest: build + 'images/favicon/', // куда попадют иконки
        srcInject: build + '*.html', // html для редактирования
        destInject: build // куда возвращается html
    },
    pug: {
        src: base + '*.pug',
        dest: build,
        expand: true
    },
    js: {
        srcJquery: 'src/js/node_modules/jquery/dist/*.*',
        destJquery: build + 'js/jquery/',
        srcHtml5shiv: 'src/js/node_modules/html5shiv/dist/*.*',
        destHtml5shiv: build + 'js/html5shiv/',
        srcNormalize: 'src/js/node_modules/normalize-css/normalize.css',
        destNormalize: build + 'css/normalize/',
        src: base + 'js/**/*.js',
        srcExternal: base + 'js/**/external.js',
        srcInternal: [base + 'js/**/*.js', '!' + base + 'js/**/external.js'],
        srcInternalExternal: [base + 'js/external.js', base + 'js/internal.js'],
        dest: build + 'js/',
        requireJs: false
    },
    json: {
        src: [
            base + 'json/**/*.*',
            '!' + base + 'json/faviconData.json'
        ],
        dest: build + 'json/'
    },
    images: {
        src: [
            base + 'images/**/*.*',
            '!' + base + 'images/sprite/**/*.*',
            '!' + base + 'images/sprite@2x/**/*.*',
            '!' + base + 'images/svg_for_icon/*.svg',
            '!' + base + 'images/spritesvg/**/*.*'
        ],
        dest: build + 'images/',
        imagemin: {
            // use добавляется в таске
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }
    },
    fontmin: {
        src: [base + 'fonts/*.ttf', base + 'fonts/*.otf'],
        srcOtf: [base + 'fonts/*.otf'],
        srcTtf: base + 'fonts/',
        dest: build + 'fonts/',
        destCSS: build + 'fonts/*.css',
        destLess: base + 'style/partials/'
    },
    less: {
        concatless: base + 'style/concat-less/',
        bemblocks: base + 'style/bem-blocks/',
        src: base + 'style/*.less',
        dest: build + 'css/',
        variables: base + 'style/partials/variables.less'
    },
    assets: {
        dest : build + 'assets/'
    },
    clean: {
        src: './' + build
    },
    ieless: {
        src: base + 'css/*.less',
        dest: build + 'css/'
    },
    autoprefixer: {
        browsers: [
            'last 10 versions',
            'ie 8',
            'ie 9'
        ]
    },
    bower: 'src/js/node_modules/**/*.*',
    wrapPipe: function(taskFn) {
        return function(done) {
            var onSuccess = function() {
                done();
            };
            var onError = function(err) {
                done(err);
            }
            var outStream = taskFn(onSuccess, onError);
            if(outStream && typeof outStream.on === 'function') {
                outStream.on('end', onSuccess);
            }
        }
    }
};