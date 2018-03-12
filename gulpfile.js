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


const PATH = {
  template: 'components/BlogTemplate.vue',
  src: 'markdown/*.md',
  resource: 'markdown/*.!(md)',
  dest: 'pages/markdown',
  map: 'assets/script/md.json',
  static: 'static/markdown'
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
      body: '',
      category: 'Default'
    }, JSON.parse('' + file.contents))

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
    .pipe(gulp.dest(PATH.static))
})

gulp.task('markdown::template', function () {
  del.sync([PATH.dest, PATH.map, PATH.static])
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
    .pipe(gulp.dest(PATH.dest))
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


gulp.task('default', ['markdown::template', 'markdown::resource', 'markdown::font']);

gulp.task('watch', function () {
  // livereload.listen()
  gulp.watch([
    PATH.template,
    PATH.src,
    PATH.resource
  ], ['default'])
})

gulp.task('watch-template', function () {
  // livereload.listen()
  gulp.watch([
    PATH.template
  ], ['default'])
})