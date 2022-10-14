import { reqDetailList } from "@/api"

const state = {
    detailList: {}

}
const mutations = {
    DETAILLIST(state, detailList) {
        state.detailList = detailList
    }

}
// 在此进行异步请求
const actions = {
    async getDetailList({ commit }, skuId) {
        const res = await reqDetailList(skuId)
        if (res.code == 200) {
            commit('DETAILLIST', res.data)
        }
    }

}

// 等同于计算属性，为简化数据而生
const getters = {
    //面包屑的数据
    //state:计算属性getters里面的state，是当前仓库中state，并非大仓库中数据【home、search】

    // 路径导航简化的数据
    categoryView(state) {
        return state.detailList.categoryView || {}
    },
    // 商品信息简化的数据
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    // 产品售卖属性简化的数据
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}