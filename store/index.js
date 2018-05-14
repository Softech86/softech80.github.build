import Vue from 'vue'
import Vuex from 'vuex'
import blogs from '~/assets/script/md.json'
import demos from '~/demo/manifest.json'
import { TimeFormat, plainHTML } from '~/assets/script/util.js'

Vue.use(Vuex)

const blogsByTime = blogs
  .map(x => Object.assign(x, {editAt: new Date(x.createdAt || x.updatedAt || 0)}))
  .sort((x, y) => y.editAt - x.editAt)
  .map(x => Object.assign(x, {
    url: `/markdown/${x.name}`,
    editAt: new TimeFormat(x.editAt).text(),
    // body: plainHTML(x.body)
  }))

const demosByTime = Object
.keys(demos).map(x => Object.assign(demos[x], {key: x}))
.map(x => Object.assign(x, {editAt: new Date(x.createdAt || x.updatedAt || 0)}))
.sort((x, y) => y.editAt - x.editAt)
.map(x => Object.assign(x, {
  url: `/demo/${x.key}/`,
  editAt: new TimeFormat(x.editAt).text(),
}))

const categories = blogsByTime.reduce((s, x) => {
  const category = s[x.category] || Object.assign(s, {[x.category]: []})[x.category]
  category.push(x)
  return s
}, {})

const store = () => new Vuex.Store({

  state: {
    blogs: blogsByTime,
    demos: demosByTime,
    categories
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
