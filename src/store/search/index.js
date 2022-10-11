import { reqSearchInfo } from '@/api'

const state = {
    // 初始化仓库
    searchList: {}

}
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqSearchInfo这个函数在调用获取服务器数据的时候，至少需要传递一个数据
        // parmas形参：是当用户派发action的时候，第二个参数传递过来的，至少是要一个空对象
        const res = await reqSearchInfo(params)
        if (res.code == 200) {
            commit('SEARCHLIST', res.data)
        }
    }
}
// 相当于计算属性，在项目中，是为了仓库中的简化数据而生
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    // 当前形参state，是当前仓库中的state，并非是大仓库中的那个state
    goodsList(state) {
        // 这样书写是有问题的 如果没有连接网络或者网络较慢，则无法获取到服务器的数据，所以我们加一个空数组，以防万一
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}