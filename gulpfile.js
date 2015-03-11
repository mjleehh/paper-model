var gulp = require('gulp');
var runSequence = require('run-sequence');
var path = require('path');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var webpack = require('webpack');


var srcFiles = path.join('lib', '**', '*.js');
var unitTestFiles = path.join('test', 'unit', '**', '*.test.js');
var functionalTestFiles = path.join('test', 'functional', 'src', '*.test.js');


gulp.task('jshint', function(){
    return gulp.src([srcFiles, unitTestFiles, functionalTestFiles])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function(){
    return gulp.src([srcFiles, unitTestFiles, functionalTestFiles])
        .pipe(jscs());
});

gulp.task('unit', function(){
    return gulp.src(unitTestFiles)
        .pipe(mocha({}));
});

gulp.task('test', function(cb){
    runSequence('jshint', 'jscs', 'unit', 'webpack', cb);
});

function createWebpackResultFn(callback) {
    return function(err, stats) {
        if (err || (stats.hasErrors)) {
            var errorMsg = err || stats.compilation.errors.join('\n');
            callback(errorMsg);
        } else {
            callback();
        }
    };
}

gulp.task('webpack', function(callback) {
    webpack({
        entry: {
            'create-paper-model': './test/functional/src/create-paper-model.js',
            vendor: ['lodash']
        },
        output: {
            path: 'test/functional/lib',
            filename: '[name].bundle.js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
        ]
    }, createWebpackResultFn(callback));
});

gulp.task('default', ['test']);
