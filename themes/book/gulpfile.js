var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//
// sass convert to css
//
gulp.task('sass', function () {
  return gulp.src('./source/_scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./source/css'));
});
