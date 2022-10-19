import { reqShopCartList, reqAddOrUpDateShopcart } from '@/api'
const state = {
    // 初始化购物车商品列表
    shopCartList: []
}
const mutations = {
    SHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const actions = {
    // 获取购物车商品信息
    async getShopCartList({ commit }) {
        const res = await reqShopCartList()
        if (res.code == 200) {
            commit('SHOPCARTLIST', res.data)
        }
    }

}
const getters = {
    shopCartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
