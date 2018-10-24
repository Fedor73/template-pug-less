/**
 * Created by biyk on 18.01.18.
 * Пройтись по всем файлам - найти миксины => Массив
 * пройтись по всем файлам - прописать миксины из массива
 */

var rename          = require("gulp-rename");
const config        = require('../../../config');
const gulp          = require('gulp');
var through         = require('through2');
var fs              = require("fs");
var  _path          = require('path');

var mixins = {};
var pugs = [];

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}

function rowInsertMixin(search, replace, subject) {
    var rows = subject.split("\n");
    rows.forEach(function (e,i) {
        var s = e.indexOf(search);
        var isComment = e.indexOf('//-');
        if (s>-1 && isComment==-1) rows[i-1]+="\n"+sp(s)+replace;
    });
    return rows.join("\n");
}

function sp(n) {
    var result='';
    console.log(n);
    for (var i=1;i<=n;i++){
        result+=' ';
    }
    return result;
}


module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src([config.base+'/**/*.pug'])
            .pipe(through.obj(function (chunk, enc, callback) {
                if (chunk.isNull() || chunk.isDirectory()) {
                    this.push(chunk);
                    return callback();
                }
                var fileContent = fs.readFileSync(chunk.path, "utf8");
                pugs.push(chunk.path);

                /**
                 * Поиск использования миксинов в файлах и формирование массива
                 */
                if (fileContent.indexOf("\nmixin")!==-1){
                    var matches = fileContent.match(/mixin (.*)\(/ig);
                    if (matches)
                        for (var i=0; i<matches.length;i++){
                            var mixin = str_replace('mixin ','',matches[i]);
                            mixin = str_replace('(','',mixin);
                            mixin = str_replace(' ','',mixin);
                            mixins[mixin] = chunk.path;
                        }
                }
                return callback(null, chunk);
            }))
            .on('data', function (data) {
                //console.log(data);
            })
            .on('end', function () {

                var sep = '/';
                var isWindows = process.platform === 'win32';
                if (isWindows) sep = '\\';
                //console.log(mixins);

                var write_pugs = {};
                /**
                 * формирование массива с ключем - путь к файлу => масси используемых миксинов
                 */
                var fileContent = [];
                for (var i=0; i<pugs.length;i++){
                    fileContent[i] = fs.readFileSync(pugs[i], "utf8");
                    for (var mixin in mixins){
                        //if (pugs[i].indexOf('404')>-1)console.log(pugs[i], mixin, fileContent[i].indexOf(mixin.toString()));

                        if (fileContent[i].indexOf('+'+mixin)>-1 && pugs[i]!=mixins[mixin]){
                            if (typeof write_pugs[pugs[i]]==='undefined') write_pugs[pugs[i]] = [];
                            write_pugs[pugs[i]].push(mixins[mixin]);
                        }
                    }
                }

                /**
                 * заполнение файлов миксинами
                 */
                for (var file in write_pugs){
                    var fileContent = fs.readFileSync(file, "utf8");
                    var result = fileContent;
                    // добавление инклюлов
                    for (var i=0; i< write_pugs[file].length;i++){

                        var content = '';
                        var mixin = write_pugs[file][i];

                        var m_array = mixin.split(sep);
                        var mixin_name = m_array[m_array.length-1] ;
                        //console.log(file ,result.indexOf(mixin_name), mixin_name)

                        //проверяем есть ли в файле нужный инклюд
                        if (result.indexOf(mixin_name)==-1){

                            var path = _path.relative(_path.dirname(file),mixin);//str_replace(_path.resolve(config.base)+'/','',mixin);
                            var path = str_replace('\\','/',path);

                            //path = str_replace('../section','src/section',path);
                            content="include "+path;
                            var _mixin = str_replace('.pug','',mixin_name);
                            result = rowInsertMixin("+"+_mixin+'(',content,result);
                            //console.log(file ,result.indexOf(mixin_name), mixin_name)
                        }else{
                            //console.log(file ,result.indexOf(mixin_name), mixin_name)
                        }
                    }

                    if (result.length!=fileContent.length)
                        fs.writeFile(file, result,function () {
                            return true;
                        });

                };
                //console.log(mixins);
            })
    });
};


