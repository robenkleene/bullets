var gulp = require('gulp');
var jade = require('gulp-jade');
var glob = require('glob');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var plumber = require('gulp-plumber');

// Paths

var paths = {
    test: {
      src: './test/src/',
      build: './test/build/'
    },
    example: {
      src: './example/src/',
      build: './example/build/'
    }
};


// Jade

gulp.task('jade-example', function() {
  gulp.src(path.join(paths.example.src, 'jade/index.jade'))
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.example.build));
});

gulp.task('jade-test', function() {
  gulp.src(path.join(paths.test.src, 'jade/index.jade'))
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.test.build));
});


// Browserify

gulp.task('browserify-test', function () {
  var b = browserify({
    entries: glob.sync(paths.test.src + 'tests/*.js')
  });

  b.bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(source('tests.js'))
    .pipe(gulp.dest(path.join(paths.test.build, 'js')));
});


// Watch

gulp.task('watch', function() {
    // Test
    gulp.watch(paths.test.src + 'jade/*.*', ['jade-test']);

    var testJSPaths = [paths.test.src + 'tests/*.js', paths.test.src + 'js/*.js'];
    gulp.watch(testJSPaths, ['browserify-test']);

    // Example
    // When "example" files change, also build "test" because "test" imports "example" content
    var exampleJadePaths = [paths.example.src + 'jade/*.*', paths.example.src + 'markdown/*.*'];
    gulp.watch(exampleJadePaths, ['jade-example', 'jade-test']);
});

gulp.task('jade', ['jade-test', 'jade-example']);
gulp.task('default', ['jade', 'browserify-test']);
