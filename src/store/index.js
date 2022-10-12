import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'

// 需要使用插件一次
Vue.use(Vuex)
// state：仓库存储数据的地方

const store = new Vuex.Store({
    // 实现Vuex仓库模块式开发
    modules: {
        home,
        search,
        detail
    }

})

export default store