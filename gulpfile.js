const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('message', function(){
    return console.log('gulp running');
});

gulp.task('imageMin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

// gulp.task('minify', function(){
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('sass', function(){
//     gulp.src('src/scss/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'));
// });

gulp.task('scripts', function(){
   gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
   gulp.src('src/scss/*.scss')
    .pipe(concat('style.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// gulp.task('default', ['imageMin', 'scripts', 'styles']); // for when a full build is required
gulp.task('default', ['scripts', 'styles']); // to process js and css
//gulp.task('default', ['styles']);

gulp.task('watch', function(){
    /*gulp.watch('src/img/*', ['imageMin']);*/
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['styles']);
});