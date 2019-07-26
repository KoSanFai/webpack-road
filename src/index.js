
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import App from './app'
import router from './router'
import store from "./store"
import './styles/index.scss'
// router动态引入需要：@babel/plugin-syntax-dynamic-import

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app")

console.log(process.env.coreHR)
console.log(process.env.BASE_URL)
console.log(process.env.NODE_ENV_TEST)
