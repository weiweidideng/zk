var gulp = require('gulp')
var bysass = require('gulp-sass')
var yscss = require('gulp-clean-css')
var server = require('gulp-webserver')
var ysjs = require('gulp-uglify')
console.log(ysjs)
    //压缩css
gulp.task('yscss', function() {
        return gulp.src('./src/sass/*.scss')
            .pipe(bysass())
            .pipe(yscss())
            .pipe(gulp.dest('./newsrc/sass'))
    })
    //压缩js
gulp.task('ysjs', function() {
        return gulp.src('./src/js/*.js')
            .pipe(ysjs())
            .pipe(gulp.dest('./newsrc/js'))
    })
    //监听
gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss')
})

//起服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                console.log(req.url)
            }
        }))
})

gulp.task('hb', gulp.series('yscss', 'ysjs', 'server', 'watch'))