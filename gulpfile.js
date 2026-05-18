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
		.pipe(gulp.dest('assets/css', { sourcemaps: '.' }))
		.pipe(bs.stream());
}

function serve() {
	bs.init({
		server: { baseDir: '.' },
		notify: false,
	});

	gulp.watch('src/scss/**/*.scss', styles);
	gulp.watch('*.html').on('change', bs.reload);
}

export const build = styles;
export default serve;
