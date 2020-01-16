//require - это команда для подключения
const { src, dest, parallel } = require('gulp'); //загружаем, подключаем gulp
const uglify = require('gulp-uglify'); //подкл. пакет минифицирования .js файлов
const concat = require('gulp-concat'); //склеивает файлы, в один
// const CleanCSS = require('clean-css'); //сжимает css файлы
// const imagemin = require('gulp-imagemin'); //оптимизация изображений
// const clean = require('gulp-clean'); //удаляет файл или папку
// const shell = require('gulp-shell'); //очередность запуска
// const browserSync = require('browser-sync').create();
// const reload = browserSync.reload; //перезегрузка сервера
// const runSequence = require('run-sequence'); //запускает задачи по очереди
// const sourcemaps = require ('gulp-sourcemaps'); //позволяет дебажить минифицированный код в браузере

const path = {
	source: {
		html: 'app/index.html',
		styles: [
			'app/css/slick.css',
			'app/css/slick-theme.css',
			'app/css/jquery.mCustomScrollbar.css',
			'app/css/main.css'
		],
		js: [
			'app/js/lazyloadxt.min.js',
			'app/js/slick.min.js',
			'app/js/jquery.mCustomScrollbar.concat.min.js',
			'app/js/script.js'
		],
		fonts: 'app/fonts/**/*',
		image: 'app/img/**/*'
	},
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		fonts: 'build/fonts/',
		image: 'build/img/'
	}
};

function html() {
	return src(path.source.html)
		.pipe(dest(path.build.html));
}

function js() {
	return src(path.source.js)
	.pipe(uglify())
	.pipe(concat('main.js'))
	.pipe(dest(path.build.js));
	// .pipe(reload({stream:true}));
}

// gulp.task('css', function() {
// 	return gulp.src(path.source.styles)
// 		.pipe(sourcemaps.init())// активация sourcemaps
// 		.pipe(CleanCSS())
// 		.pipe(concat('main.css'))
// 		.pipe(sourcemaps.write())// активация sourcemaps
// 		.pipe(gulp.dest(path.build.css))
// 		.pipe(reload({stream:true}));
// });
// function 


// gulp.task('fonts', function() {
// 	return gulp.src(path.source.fonts)
// 		.pipe(gulp.dest(path.build.fonts));
// });

// gulp.task('images', function() {
// 	return gulp.src(path.source.image)
// 		.pipe(imagemin([
// 		    imagemin.gifsicle({interlaced: true}),
// 		    imagemin.jpegtran({progressive: true}),
// 		    imagemin.optipng({optimizationLevel: 5}),
// 		    imagemin.svgo({
// 		        plugins: [
// 		            {removeViewBox: true},
// 		            {cleanupIDs: false}
// 		        ]
// 		    })
// 		], {
// 		    verbose: true
// 		}))
// 		.pipe(gulp.dest(path.build.image));
// });

// gulp.task('clean', function() {
// 	return gulp.src('build')
// 		.pipe(clean());
// });//задача удаления файла или папки

// gulp.task('build', shell.task([
// 	'gulp clean',
// 	'gulp html',
// 	'gulp css',
// 	'gulp js',
// 	'gulp images',
// 	'gulp fonts'
// ]));

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./build" //прописываем адрес откуда открыть
//         }
//     });
// });

// gulp.task('watch', function() {
	// gulp.watch('app/index.html', ['html']);
	// gulp.watch('app/css/*.css', ['css']);
	// gulp.watch('app/js/*.js', ['js']);
// });// Ctrl+C для остановки задачи

// gulp.task('server', function() {
	// runSequence('build', 'browser-sync', 'watch');
// }); // Ctrl+C для остановки задачи

// gulp.task('default', ('server') ); //программа по умолчанию

exports.js = js;
// exports.css = css;
exports.html = html;
// exports.default = parallel(html, css, js);