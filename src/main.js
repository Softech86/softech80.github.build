// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bus from './bus'
import 'normalize-css'

Vue.config.productionTip = false

Vue.use(bus)

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
