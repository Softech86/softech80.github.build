import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Markdown from '@/view/markdown'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/markdown/:path(.+)',
      name: 'markdown',
      component: Markdown
    }
  ]
})

let savedPosition = {}

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  savedPosition[from.name] = [window.scrollX, window.scrollY]
  const spt = savedPosition[to.name]
  window.scrollTo(...(spt || [0, 0]))
  next()
})

export default router
