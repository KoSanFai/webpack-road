import "./styles/index.scss"
import Vue from 'vue'
import App from './app'
new Vue({
  render: h => h(App)
}).$mount('#app')
console.log(process.env.coreHR)
console.log(process.env.BASE_URL)
console.log(process.env.NODE_TEST_ENV)
