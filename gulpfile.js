var gulp = require('gulp');
var path = require('path');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');


var indexFile = 'index.html';
var srcFiles = path.join('lib', '**', '*.js');
var unitTestFiles = path.join('test', 'unit', '**', '*.test.js');
var functionalTestFiles = path.join('test', 'functional', 'src', '*.test.js');


gulp.task('jshint', function(){
    return gulp.src([indexFile, srcFiles, unitTestFiles, functionalTestFiles])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function(){
    return gulp.src([indexFile, srcFiles, unitTestFiles, functionalTestFiles])
        .pipe(jscs());
});

gulp.task('unit', function(){
    return gulp.src(unitTestFiles)
        .pipe(mocha({}));
});

gulp.task('test', ['jshint', 'jscs', 'unit']);

gulp.task('default', ['test']);
