
const { src, dest, series, parallel, watch } = require('gulp'); //загружаем, подключаем gulp
const uglify = require('gulp-uglify'); //подкл. пакет минифицирования .js файлов
const concat = require('gulp-concat'); //склеивает файлы, в один
const cleanCSS = require('gulp-clean-css'); //сжимает css файлы
const del = require('del'); //удаление папки перед сборкой
const imagemin = require('gulp-imagemin'); //оптимизация изображений
// const clean = require('gulp-clean'); //удаляет файл или папку
// const shell = require('gulp-shell'); //очередность запуска
// const browserSync = require('browser-sync').create();
// const reload = browserSync.reload; //перезегрузка сервера
// const runSequence = require('run-sequence'); //запускает задачи по очереди
const sourcemaps = require ('gulp-sourcemaps'); //позволяет дебажить минифицированный код в браузере

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
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write())
		.pipe(dest(path.build.js));
		// .pipe(reload({stream:true}));
}

function css() {
	return src(path.source.styles)
		.pipe(sourcemaps.init())// активация sourcemaps
		.pipe(cleanCSS())
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write())// активация sourcemaps
		.pipe(dest(path.build.css));
		// .pipe(reload({stream:true}));
}

function fonts() {
	return src(path.source.fonts)
		.pipe(dest(path.build.fonts));
}

function images() {
	return src(path.source.image)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		], {
		    verbose: true
		}))
		.pipe(dest(path.build.image));
};

function cleanFolder() {
	return del(['build']);
};//задача удаления файла или папки

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

function watcher() {
	watch('app/index.html', html);
	watch('app/css/*.css', css);
	watch('app/js/*.js', js);
};

// gulp.task('server', function() {
	// runSequence('build', 'browser-sync', 'watch');
// }); // Ctrl+C для остановки задачи

// gulp.task('default', ('server') ); //программа по умолчанию

exports.js = js;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.clean = cleanFolder;
exports.watcher = watcher;
exports.build  = series(cleanFolder, parallel(html, css, js, images, fonts));

exports.default  = series(cleanFolder, parallel(html, css, js, images, fonts));