var gulp = require('gulp');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var del = require('del');


gulp.task('hint', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['hint']);
});

gulp.task('uglify', function() {
    return gulp.src('dist/js/base.js')
        .pipe(rename({suffix: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});



