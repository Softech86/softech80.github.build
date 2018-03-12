import Vue from 'vue'
import Vuex from 'vuex'
import blogs from '~/assets/script/md.json'
import { TimeFormat, plainHTML } from '~/assets/script/util.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    blogs: blogs
      .map(x => Object.assign(x, {editAt: new Date(x.createdAt || x.updatedAt || 0)}))
      .sort((x, y) => x.editAt < y.editAt)
      .map(x => {
        Object.assign(x, {
          url: `/markdown/${x.name}`,
          editAt: new TimeFormat(x.editAt).text(),
          body: plainHTML(x.body)
        })
        return x
      })
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
