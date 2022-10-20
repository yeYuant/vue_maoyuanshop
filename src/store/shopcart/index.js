import { reqShopCartList, reqDeleteCartById } from '@/api'
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
    },
    // 根据ID删除选中的购物车商品
    async deleteShopCartById({ commit }, skuId) {

        const res = await reqDeleteCartById(skuId)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed: 删除商品失败！'))
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
