import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

function styles() {
	return gulp
		.src('scss/style.scss', { sourcemaps: true })
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('.', { sourcemaps: '.' }))
		.pipe(bs.stream());
}

function serve() {
	bs.init({
		server: { baseDir: '.' },
		notify: false,
	});

	gulp.watch('scss/**/*.scss', styles);
	gulp.watch('*.html').on('change', bs.reload);
}

export const build = styles;
export default serve;
