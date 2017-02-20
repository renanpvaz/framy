const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const pump = require('pump');
const concat = require('gulp-concat');

gulp.task('compress', cb => {
  pump([
      gulp.src('src/*.js'),
      concat('framy.min.js'),
      babel({ presets: ['es2015'] }),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});
