import { reqGetUserAddress, reqGetTradeGoodsList, reqSubmitUserOrder } from '@/api'
const state = {
    // 用户地址信息
    userAddress: [],
    // 用户下单的商品信息
    tradeGoodsList: {},
    // 商品单号
    orderId: ''

}
const mutations = {
    // 用户地址信息
    USERADDRESS(state, userAddress) {
        state.userAddress = userAddress
    },
    // 用户的交易页商品信息
    TRADEGOODSLIST(state, tradeGoodsList) {
        state.tradeGoodsList = tradeGoodsList
    },
    // 用户的商品单号
    POSTUSERORDER(state, orderId) {
        state.orderId = orderId
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        const res = await reqGetUserAddress()
        if (res.code == 200) {
            commit('USERADDRESS', res.data)

        }
    },
    // 获取交易页面信息
    async getTradeGoodsList({ commit }) {
        const res = await reqGetTradeGoodsList()
        if (res.code == 200) {
            commit('TRADEGOODSLIST', res.data)
        }
    },
    // 提交用户订单
    async postUserOrder({ commit }, { tradeNo, data }) {
        const res = await reqSubmitUserOrder(tradeNo, data)
        if (res.code == 200) {
            commit('POSTUSERORDER', res.data) // res.data 是用户的商品单号
            return 'ok'
        } else {
            return Promise.reject(new Error('filed 提交订单失败！'))
        }
    },

}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}