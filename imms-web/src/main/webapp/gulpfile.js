var gulp = require('gulp');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserify=require('gulp-browserify');
var livereload = require('gulp-livereload');

//gulp.task('live', function () {    // 这里的watch，是自定义的，写成live或者别的也行
//    var server = livereload();
//    gulp.watch('dist/**/*.*', function (file) {
//        for(var n in server)console.log(n)
//        //server.change(file.path);
//    });
//});

//gulp.task('less', function() {
//gulp.src(['dist/**/*.*'])
//    //.pipe(less())
//   // .pipe(gulp.dest('frontend-tech/webIndexPage/src'))
//    .pipe(livereload());
//});

gulp.task('live', function() {
    livereload.listen();
    gulp.watch('*.*',function(file){
        console.log(file.path)
        gulp.src(file.path).pipe(livereload());
    });
});

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
        gulp.src('dist/css/base.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
         gulp.src('dist/css/index.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

//gulp.task('browserify', function(){
//    return gulp.src('script/base.js')
//        //.transform(babelify)
//       // .bundle()
//       // .pipe(source('bundle.js'))
//        .pipe(browserify())
//        .pipe(gulp.dest('dist/js'));
//});

gulp.task('browserify', function() {
    // Single entry point to browserify
    return gulp.src('script/base.js')
        .pipe(browserify({
            //insertGlobals : true,
            //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('uglify', function() {
    return gulp.src('dist/js/base.js')
       // .pipe(rename({suffix: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// dragon
gulp.task('base',['browserify'],function(){
    gulp.run('uglify');
});

// dragon
gulp.task('dragon',['hint','browserify','less','minifycss'],function(){
    gulp.run('uglify');
    //gulp.watch('pre/js/*.js' , ['hint','js'] );

    //gulp.watch('pre/less/*.less', function(){
    //    gulp.task('less');
    //});
    //gulp.watch('pre/css/*.css', function(){
    //    gulp.task('minifyCss');
    //});
});

gulp.task('default', ['dragon']);




