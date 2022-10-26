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
// 导入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 导入图片
import awaiting from '@/assets/awaiting.gif'
//引入表单校验插件
import "@/plugins/validate";
import * as API from "@/api";
// 将三级联动组件注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 将轮播图组件注册为全局组
Vue.component(Carousel.name, Carousel)
// 将分页器组件注册为全局组件
Vue.component(Pagination.name, Pagination)
// 按需引入 element-ui 组件 和 message弹框提示组件
import { MessageBox } from "element-ui";

// 导入mockServer.js
import '@/mock/mockServer'
// 导入swiper css样式
import 'swiper/css/swiper.min.css'
// 导入表单验证插件
import 'vee-validate'

Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册图片懒加载插件
Vue.use(VueLazyload, {
  loading: awaiting
})

new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册Vuex
  store
}).$mount('#app')
