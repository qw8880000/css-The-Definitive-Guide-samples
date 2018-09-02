var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//
// sass convert to css
//
gulp.task('sass', function () {
  return gulp.src('./source/_scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./source/css'));
});

//
// watch
//
gulp.task('watch', function () {
  gulp.watch('./source/_scss/**/*.scss', ['sass']);
});

gulp.task('default', [
  'sass',
  'watch'
]);
