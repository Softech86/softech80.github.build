function TimeFormat (t) {
  this._time = new Date(t)
}
TimeFormat.prototype.text = function () {
  const y = this._time.getFullYear()
  const m = this._time.getMonth()
  const d = this._time.getDate()
  const M = 'JanFebMarAprMayJunJulAugSepOctNovDec'.match(/.{3}/g)[m]

  return `${M} ${d} ${y}`
}

module.exports = {

  TimeFormat,

  plainHTML (html) {
    let s;
    do {
      s = html
      html = html
        .replace(/(?:<(\w+)(?:\s+?\S+?)*?>([\s\S]+?)(?:<\/\1>))|([\s\S]+?)/g, '$2$3')
        .replace(/<\w+[\s\S]*?\/>/g, '')
        .replace(/<(img)[\s\S]*?>/g, '')
        .trim()
    } while (s !== html)
    return html
  }
}
