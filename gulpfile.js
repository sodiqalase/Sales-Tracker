const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-terser');
const uglifycss = require('gulp-uglifycss');



gulp.task('sass', function(){
  
  let plugin = [autoprefixer()];
  return gulp.src('./sass/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugin))
  .pipe(uglifycss({uglyComments: true}))
  .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function(){
  return gulp.src('./js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
})





gulp.task('default', function(){
  gulp.watch('./sass/*.sass', gulp.series('sass'));
  gulp.watch('./js/*.js', gulp.series('js'));
});







 
