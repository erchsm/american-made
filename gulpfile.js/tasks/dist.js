var gulp            = require('gulp');


gulp.task('dist', ['ejs', 'copyImg', 'iconfont', 'scripts-nowatch', 'build-styles']);

gulp.task('build-styles', ['iconfont'], function() {
    return gulp.start('styles');
});