var gulp = require('gulp')
var bysass = require('gulp-sass')
var yscss = require('gulp-clean-css')
var server = require('gulp-webserver')
var ysjs = require('gulp-uglify')
var fs = require('fs')
var path = require('path')
var url = require('url')
var cs = {
        "code": 0,
        "nr": ["八维教育", "八维绩效", "八维技校", "八神", "八一建军节", "八询老汉", "八岁女孩", "八月瓜"]
    }
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
                var pathname = url.parse(req.url).pathname

                if (pathname == '/favicon.ico') {
                    return res.end()
                }
                //动态内容
                if (pathname == '/api/first') {
                    var yh = url.parse(req.url, true).query.value
                    var arr = []
                    if (yh) {
                        cs.nr.forEach(function(v) {
                            if (v.match(yh)) {
                                arr.push(v)
                            }
                        })
                        res.end(JSON.stringify({ code: 0, msg: arr }))
                    } else {
                        res.end(JSON.stringify({ code: 1 }))
                    }


                } else {
                    pathname = pathname == '/' ? 'html/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
                res.end('.')
            }
        }))
})
gulp.task('hb', gulp.series('yscss', 'ysjs', 'server', 'watch'))