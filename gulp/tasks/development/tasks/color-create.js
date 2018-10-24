/**
 * Created by biyk on 18.01.18.
 */

var rename          = require("gulp-rename");
const config        = require('../../../config');
const gulp   = require('gulp');
var concat = require('gulp-concat');
var fs              = require("fs");

gulp.remote = require('gulp-remote');

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}

function makeName(name) {
    var result = str_replace(' ','-',name);
    result = str_replace('(','',result);
    result = str_replace(')','',result);
    return result.toLowerCase();
}

function makeChange(color) {
    // you're going to receive Vinyl files as chunks
    function transform(file, cb) {
        // read and modify file contents
        var name = String(file.contents).match( /color description : <strong>(.*)<\/strong>\./i )[1];
        var colorHex = String(file.contents).match( /<title>(.*)#(.*) hex color(.*)<\/title>/i )[2];

        var color = '@cl-'+makeName(name)+': #'+colorHex+';';


        var fileContent = fs.readFileSync(config.less.variables, "utf8");
        var result = fileContent;

        if (result.indexOf(colorHex)!==-1) return false;

        result = result + '\n'+color;
        fs.writeFile(config.less.variables, result,function () {
            return true;
        });
        console.log('Creating color: '+name);
        console.log(color);
        cb(null, file);
    }
    return require('event-stream').map(transform);
}

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        var name, i = process.argv.indexOf("--color");
        if(i>-1) {
            name = process.argv[i+1];
        }
        if (name){
            name  =str_replace('--','',name);
            return gulp.remote([
                'https://www.colorhexa.com/'+name,
            ])
                .pipe(concat('test.html'))
                .pipe(makeChange())
        }
        else
            return console.log(process.argv);


    });
};


