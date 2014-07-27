var gulp = require('gulp');
var typescript = require('gulp-typescript-compiler');
//var browserify = require('gulp-browserify');

gulp.task('default', function() {
    gulp.src('src/app/**/*.ts')
    .pipe(typescript({resolve: true}))
    .pipe(gulp.dest('dist/commonjs'));
});
