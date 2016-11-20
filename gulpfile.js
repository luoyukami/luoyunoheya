var gulp = require('gulp')
var watch = require('gulp-watch')
var browserSync = require('browser-sync')
var reload = browserSync.reload

gulp.task('default', function() {
  // body...
})
//  监听文件、刷新浏览器
gulp.task('serve', function() {
  // 设定目录
  browserSync({
    serve: {
      baseDir: '../wechat'
    }
  })
  // 设定文件类型和目录
  gulp.watch(['*.html', '*.js', 'wechat/**/*.js'])
})

