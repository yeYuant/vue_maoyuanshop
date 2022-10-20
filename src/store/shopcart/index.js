import { reqShopCartList, reqDeleteCartById, reqCartCheckById } from '@/api'
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
    },

    // 切换商品选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        const res = await reqCartCheckById(skuId, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed: 切换商品选中状态失败！'))
        }

    },

    // 删除所有选中的商品
    // context:小仓库，commit【提交mutations修改state】，getters【计算属性】 dispatch【派发action】 state【当前数据库】
    async deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        await getters.shopCartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteShopCartById', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)

    },
    // 更改全选按钮状态
    updateAllChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.shopCartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
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
