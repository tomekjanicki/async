/// <vs BeforeBuild='default' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var bower = require('gulp-bower');

var config = {
    //JavaScript files that will be combined into a jquery bundle
    jquerysrc: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-validation/dist/jquery.validate.min.js',
        'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js'
    ],
    jquerybundle: 'Scripts/jquery-bundle.min.js',

    //JavaScript files that will be combined into a Bootstrap bundle
    bootstrapsrc: [
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/respond-minmax/dest/respond.min.js'
    ],
    bootstrapbundle: 'Scripts/bootstrap-bundle.min.js',

    //Modernizr
    modernizrsrc: ['bower_components/modernizr/modernizr.js'],
    modernizrbundle: 'Scripts/modernizer.min.js',

    //Bootstrap CSS and Fonts
    bootstrapcss: 'bower_components/bootstrap/dist/css/bootstrap.css',
    boostrapfonts: 'bower_components/bootstrap/dist/fonts/*.*',

    appcss: 'Content/Site.css',
    fontsout: 'Content/dist/fonts',
    cssout: 'Content/dist/css'

}

// Synchronously delete the output script file(s)
gulp.task('clean-vendor-scripts', function () {
    del.sync([config.jquerybundle,
              config.bootstrapbundle,
              config.modernizrbundle]);
});

// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('vendor-scripts', ['clean-vendor-scripts', 'bower-restore'], function () {
    gulp.src(config.jquerysrc)
     .pipe(concat('jquery-bundle.min.js'))
     .pipe(gulp.dest('Scripts'));

    gulp.src(config.bootstrapsrc)
     .pipe(concat('bootstrap-bundle.min.js'))
     .pipe(gulp.dest('Scripts'));

    gulp.src(config.modernizrsrc)
        .pipe(uglify())
        .pipe(concat('modernizer-min.js'))
        .pipe(gulp.dest('Scripts'));

});

// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function () {
    del.sync([config.fontsout,
              config.cssout]);
});

// Combine and minify css files and output fonts
gulp.task('styles', ['clean-styles', 'bower-restore'], function () {
    gulp.src([config.bootstrapcss, config.appcss])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));

    gulp.src(config.boostrapfonts)
        .pipe(gulp.dest(config.fontsout));

});

//Restore all bower packages
gulp.task('bower-restore', function () {
    bower();
});

//Set a default tasks 
gulp.task('default', ['vendor-scripts', 'styles'], function () { });