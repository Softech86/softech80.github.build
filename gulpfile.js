const gulp = require('gulp');
const through = require('through2');
const rename = require("gulp-rename");
const watch = require('gulp-watch')
const livereload = require('gulp-livereload')
const lodash = require("lodash")
const del = require('del');
const fs = require("fs")
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
const highlight = require('highlight.js')
const md5 = require('md5');
const fontmin = require('gulp-fontmin');
const jsonfile = require('jsonfile')
const print = require('gulp-print').default

const util = require('./assets/script/util.js')


const PATH = {
  template: 'components/BlogTemplate.vue',
  src: 'markdown/*.md',
  resource: 'markdown/**/*.!(md)',
  markdownDist: 'pages/markdown',
  map: 'assets/script/md.json',
  static: 'static/markdown',
  demo: 'demo/**/*',
  demoDist: 'static/demo/static'
}


marked.setOptions({
  pedantic: true,
  smartypants: true,
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
});

const JSONToVue = function(template) {
  return through.obj(function (file, enc, cb) {
    const data = Object.assign({
      title: '',
      titleImage: '',
      createdAt: '',
      updatedAt: '',
      time: '',
      body: '',
      category: 'Default'
    }, JSON.parse('' + file.contents))
    data.time = new util.TimeFormat(data.createdAt || data.updatedAt || 0).text()


    file.data = data
    file.contents = new Buffer(lodash.template(template)(data))
    // delete file.data.body

    this.push(file); // 似乎需要push一下，不然后续的pipe不会处理这个文件？
    return cb();
  });
};

// const JSON
function minifyFont(text, cb) {
  gulp
    .src('assets/font/*.ttf')
    .pipe(fontmin({
      text
    }))
    .pipe(gulp.dest('static/font'))
    .on('end', cb);
}

gulp.task('markdown::font', function(cb) {
  const titles = [];

  gulp.src(PATH.src)
    .pipe(markdownToJSON(marked))
    .on('data', function(file) {
      const data = JSON.parse('' + file.contents)
      titles.push(data.title)
    })
    .on('end', function() {
      const text = titles.join('').match(/\W/g).join('')
      console.log(text)
      minifyFont(text, cb);
    });

});

gulp.task('markdown::resource', function () {
  return gulp.src(PATH.resource)
    .pipe(print(function (filepath) {
      return `Moving resource: ${filepath}`
    }))
    .pipe(gulp.dest(PATH.static))
})

gulp.task('demo::resource', function () {
  return gulp.src(PATH.demo)
    .pipe(print(function (filepath) {
      return `Moving resource: ${filepath}`
    }))
    .pipe(gulp.dest(PATH.demoDist))
})

gulp.task('markdown::template', function () {
  del.sync([PATH.markdownDist, PATH.demoDist, PATH.map, PATH.static])
  const file = fs.readFileSync(PATH.template);
  const template = file.toString()

  const paths = [];

  gulp.src(PATH.src)
    .pipe(markdownToJSON(marked))
    .pipe(JSONToVue(template))
    .pipe(rename(function (path) {
      path.basename = md5(path.basename)
      path.extname = ".vue"
    }))
    .pipe(gulp.dest(PATH.markdownDist))
    .on('data', function (file) {
      paths.push(Object.assign({
        name: file.relative.slice(0, -4)
      }, file.data))
    })
    .on('end', function() {
      // const js = `
      //     const data = ${ JSON.stringify(paths, null, 4) };
      //     export { data }
      // `
      // fs.writeFileSync(PATH.map, js)
      jsonfile.writeFileSync(PATH.map, paths)
    });
})


gulp.task('default', ['markdown::template', 'markdown::resource', 'markdown::font', 'demo::resource']);

gulp.task('watch', function () {
  // livereload.listen()
  gulp.watch([
    PATH.template,
    PATH.src,
    PATH.resource
  ], ['default'])
  gulp.watch(PATH.demo, ['demo::resource'])
})

gulp.task('watch-template', function () {
  // livereload.listen()
  gulp.watch([
    PATH.template
  ], ['default'])
})
