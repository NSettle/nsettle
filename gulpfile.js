var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var source_path = {
    scss: ['./src/scss/*.scss'],
    app: ['./src/js/app.jsx'],
    js: ['./src/js/**/*.*'],
}

gulp.task('scss', function() {
    gulp.src(source_path.scss).pipe(sass()).pipe(gulp.dest('./static/css'));
});

gulp.task('js', function() {
    browserify(source_path.app).transform(reactify).bundle().pipe(source('app.js')).pipe(gulp.dest('./static/js'));
});

gulp.task('watch', ['js', 'scss'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./']
    });

    gulp.watch(source_path.scss, ['scss']);
    gulp.watch(source_path.js, ['js']);

    gulp.watch("static/**").on('change', reload);
});

gulp.task('default', ['js', 'scss']);
