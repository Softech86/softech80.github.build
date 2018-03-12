// const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'A Blog of Softech86',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Blog of Softech86' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#60a6e9' },

  css: [
    // '~assets/css/main.css',
    { src: '~assets/style/global.scss', lang: 'scss' } // scss instead of sass
  ],
  /*
  ** Build configuration
  */
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     '$': 'jquery',
    //     '_': 'lodash'
    //     // ...etc.
    //   })
    // ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push(
          {
            enforce: 'pre',
            test: /\.(scss|sass)$/,
            loader: 'sass-resources-loader',
            options: {
              resources: './assets/style/oo.scss'
            }
          }, {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
//
