var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var nib = require('nib');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync({
    notify: false,
		server: {
			baseDir: ['.tmp', 'assets']
		}
	});
});

gulp.task('stylus', function() {
	gulp.src('./assets/styles/**/*.styl')
		.pipe(stylus({
			use: [nib()]
		}))
		.pipe(gulp.dest('./assets/styles/'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('jade', function() {
  gulp.src('./assets/jade/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

gulp.task('bs-reload', function() {
	browserSync.reload();
});

gulp.task('default', ['stylus', 'jade', 'browser-sync'], function() {
	gulp.watch('./assets/styles/*.styl', ['stylus']);
	gulp.watch('./assets/jade/**/*.jade', ['jade']);
	gulp.watch(['.tmp/*.html', './assets/**/*', './assets/**/*.styl', '!./assets/**/*.css', '!./node_modules/**/*'], ['bs-reload']);
});
