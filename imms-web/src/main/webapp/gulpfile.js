var gulp = require('gulp');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var del = require('del');


gulp.task('hint', function() {
    gulp.src('script/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('script/*.js', ['hint']);
});


gulp.task('less', function () {
    gulp.src('style/base.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
    gulp.src('style/index.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minifycss', function() {
    return gulp.src('dist/css/base.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('browserify', function(){
    return browserify('script/base.js')
        //.transform(babelify)
       // .bundle()
       // .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', function() {
    return gulp.src('dist/js/base.js')
        .pipe(rename({suffix: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});



