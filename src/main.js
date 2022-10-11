import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from '@/router'
// 导入Vuex
import store from '@/store'
// 导入三级联动全局组件
import TypeNav from '@/components/type-nav/TypeNav.vue'
// 导入轮播图全局组件
import Carousel from '@/components/carousel/Carousel.vue'
// 导入分页器全局组件
import Pagination from '@/components/pagination/Pagination.vue'
// 将三级联动组件注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 将轮播图组件注册为全局组件
Vue.component(Carousel.name, Carousel)
// 将分页器组件注册为全局组件
Vue.component(Pagination.name, Pagination)


// 导入mockServer.js
import '@/mock/mockServer'
// 导入swiper css样式
import 'swiper/css/swiper.min.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由
  router,
  // 注册Vuex
  store
}).$mount('#app')
