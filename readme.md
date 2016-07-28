# Шаблон для сборки верстки

Для сборки нужен `node.js`, `gulp.js`, `bower`

## Плагины

`gulp` 
`gulp-connect` 
`gulp-coffee` 
`gulp-clean` 
`gulp-sass` 
`gulp-include` 
`gulp-cssmin` 
`gulp-rename` 
`gulp-filelist` 
`gulp-using` 
`gulp-plumber` 
`gulp-autoprefixer` 
`gulp-jsmin`

а так же стандартные модули `nodejs`:

`colors`
`map-stream`
`child_process`

## Структура шаблона

```
root
├──coffee
    └──init
├──dist
    ├──css
    └──js
        ├──init
        ├──lib
        ├──plugins
        └──loader.min.js
├──html
    └──includes
├──psd
├──scss
    └──media
└──gulpfile.js
```

- `coffee/` - CoffeScript-файлы. В ней лежит папка `init/` для скриптов, которые инициализируют плагины. Для каждого плагина свой init-файл.
- `dist/` - Готовая собранная верстка. html-файлы берутся из папки `html`
    - `css/` - стили
    - `js/` - скрипты, компилируются из папки `coffee/`
    - `js/lib/` - скрипты для библиотек (jquery.js, raphael.js, etc.)
    - `js/plugins/` - скрипты плагинов (Owl Carousel)
    - `js/init/` - скрипты инициализации плагинов. Для каждого плагина свой скрипт инициализации.
- `html/` - html-файлы файлы страниц лежат в корне этотй папки. Здесь же, лежит папка `includes/` для включения частей html-кода в основные старницы
- `psd/` - `.psd`-файлы страниц
- `scss/` - папка для SASS-файлов. В gulpfile.js зарезервирован просмотр корневой папки (`scss/`) + вложенных папок (например `scss/folder1/`, `scss/folder2/`...). Названия папок, файлов и структура папки организовывается разработчиком.
    - `media` - папка для файлов с медиа-запросами.

## Работа с шаблоном

- `npm install` - установить зависимости (плагины gulp.js) из `package.json`
- `bower init` - создать `bower.json` с именем, описанием и прочими данными
- `bower install <package1> <package2> ...` - установить пакеты для верстки с флагом `--save-dev` для сохранения в зависимости (`bower.json`).

## Loader.min.js

Скрипт, который использует `require.js` для загрузки скриптов.

```
<script src="js/loader.min.js"></script>
<script>
	ScriptsLoader.load([
		"primary script 1",
		"primary script 2",
		"primary script n"
	], [
		"init script 1",
		"init script 2",
		"init script n"
	]);
</script>
```

Первый массив - скрипты плагинов, jQuery и т.д.

Второй массив - скрипты которые инициализируют плагины.