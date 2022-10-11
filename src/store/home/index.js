import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
const state = { // home模块的小仓库
    // 三级联动菜单数据
    categoryList: [],
    // 首页轮播图数据
    bannerList: [],
    // 首页家用电器数据
    floorList: []
} //存放数据
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
} //mutations：修改state的唯一手段
const actions = {
    // 通过API里面的接口函数调用，想服务器发请求，获取服务器的数据
    async getCategoryList({ commit }) {
        const res = await reqCategoryList()
        if (res.code == 200) {
            commit("CATEGORYLIST", res.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        const res = await reqBannerList()
        if (res.code == 200) {
            commit('BANNERLIST', res.data)
        }
    },
    // 获取首页floor数据
    async getFloorList({ commit }) {
        const res = await reqFloorList()
        if (res.code == 200) {
            commit('FLOORLIST', res.data)
        }
    }

} //actions：处理actions，可以水榭自己的业务逻辑，也可以处理异步任务
const getters = {} //getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
export default {
    // namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters
}