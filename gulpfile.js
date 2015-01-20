var gulp = require('gulp'),
	scss = require('gulp-ruby-sass'),
	server = require('gulp-develop-server'),
	livereload = require('gulp-livereload');

var options = {
    path: 'bin/www'
};

gulp.task('server:start', function() {
	server.listen(options, livereload.listen);
});

gulp.task('styles', function() {
	styleTask();
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss').on('change', function(file) {
		styleTask();
		restart(file);
	});
	gulp.watch(['app.js', 'routes/*.js', 'views/**/*.jade', 'public/javascripts/**/*.js', 'public/views/**/*.html']).on('change', restart);
});

gulp.task('default', ['styles', 'server:start', 'watch']);

function styleTask() {
	gulp.src('public/stylesheets/sass/**/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('public/stylesheets/'));
};

function restart( file ) {
    server.changed( function( error ) {
        if( ! error ) livereload.changed( file.path );
    });
};