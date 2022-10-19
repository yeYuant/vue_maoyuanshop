import { reqDetailList, reqAddOrUpDateShopcart } from "@/api"
import { getUUID } from "@/utils/uuid_tkoen"

const state = {
    detailList: {},
    // 储存游客的临时身份
    uuid_token: getUUID()

}
const mutations = {
    DETAILLIST(state, detailList) {
        state.detailList = detailList
    }

}
// 在此进行异步请求
const actions = {
    // 获取产品信息的action
    async getDetailList({ commit }, skuId) {
        const res = await reqDetailList(skuId)
        if (res.code == 200) {
            commit('DETAILLIST', res.data)
        }
    },
    // 将产品添加到购物车中||修改产品的个数
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并不会返回其他的数据，只是返回code == 200，代表数据传递成功
    // 服务器不会返回我们多余的数据，因此不需要在mutations和state中进行操作
    async AddOrUpDateShopcart({ commit }, { skuId, skuNum }) {
        const res = await reqAddOrUpDateShopcart(skuId, skuNum)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed: 添加购物车失败！'))
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