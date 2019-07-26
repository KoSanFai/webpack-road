import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from './modules/home'
import about from './modules/about'

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    ...home,
    ...about
  ]
})