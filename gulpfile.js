import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

function styles() {
	return gulp
		.src('src/scss/style.scss', { sourcemaps: true })
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('css', { sourcemaps: '.' }))
		.pipe(bs.stream());
}

function images() {
	return gulp
		.src('src/img/**/*')
		.pipe(gulp.dest('img'));
}

function serve() {
	bs.init({
		server: { baseDir: '.' },
		notify: false,
	});

	gulp.watch('src/scss/**/*.scss', styles);
	gulp.watch('src/img/**/*', images);
	gulp.watch('*.html').on('change', bs.reload);
}

export const build = gulp.parallel(styles, images);
export default serve;
