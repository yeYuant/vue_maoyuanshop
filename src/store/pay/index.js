import { reqGetOrderPayInfo } from '@/api'
const state = {
    // 用户的订单支付信息
    payInfo: {}
}
const mutations = {
    ORDERPAYINFO(state, payInfo) {
        state.payInfo = payInfo
    }
}
const actions = {
    async getOrderPayInfo({ commit }, orderId) {
        const res = await reqGetOrderPayInfo(orderId)
        if (res.code == 200) {
            commit('ORDERPAYINFO', res.data)
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}