var gulp = require('gulp'),
	scss = require('gulp-ruby-sass'),
	server = require('gulp-develop-server'),
	livereload = require('gulp-livereload'),
	Q = require('q');

var sassLocation = 'public/stylesheets/sass/**/*.scss',
	cssLocation = 'public/stylesheets/',
	applicationScript = 'app.js',
	nodeRoutes = 'routes/**/*.js',
	nodeViews = 'views/**/*.jade',
	javascriptFiles = 'public/javascripts/**/*.js',
	angularViews = 'public/views/**/*.html';

var nodeServer = {
    	path: 'bin/www'
	},
	scssFileChangedPattern = /(.*\.scss$)/; // SASS files end with '.scss'

gulp.task('styles', function() {
	compileSass();
});

gulp.task('server:start', function() {
	server.listen(nodeServer, livereload.listen);
});

gulp.task('watch', function() {
	gulp.watch([applicationScript, nodeRoutes, nodeViews, javascriptFiles, angularViews, sassLocation]).on('change', handleFileChanges);
});

gulp.task('default', ['styles', 'server:start', 'watch']);

function compileSass() {
	var deferred = Q.defer();
	gulp.src(sassLocation)
		.pipe(scss())
		.pipe(gulp.dest(cssLocation))
		.on('end', function() {
			deferred.resolve();
		});
	return deferred.promise;
};

function restartServer(file) {
	/* Restart server. */
    server.changed(function(error) { // It will throw exception if the server is not yet started [User Awareness].
        if(!error) {
        	livereload.changed(file.path);
        } else {
        	console.log('Error: ' + JSON.stringify(error));
        }
    });
}

function handleFileChanges(file) {
	/* Check if a SASS file has changed. */
	if (scssFileChangedPattern.exec(file.path)) {
		compileSass().then(restartServer(file));
	} else {
		restartServer(file);
	}
	
};