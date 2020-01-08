import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios' // 引入axios

// 设置axios拦截器
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 发送请求之前做什么
  // console.log(config)
  // const token = window.localStorage.getItem('user-token')
  // // 如果token里面有值的话
  // if (token) {
  //   // 那么就让这个里面的属性带上这个token值
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

axios.defaults.baseURL = 'http://192.168.1.106' // 设置基地址
Vue.prototype.$axios = axios // 将axios共享给所有实例使用
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
