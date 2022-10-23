import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout } from '@/api'

// 登录和注册的仓库
const state = {
    // 验证码
    code: '',
    // 用户身份信息
    token: localStorage.getItem('TOKEN'),
    // 登录后的用户信息
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地用户数据
    CLEARUSERINFO(state) {
        //帮仓库中先关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        const res = await reqGetCode(phone)
        if (res.code == 200) {
            commit('GETCODE', res.data)
        } else {
            return Promise.reject(new Error('filed 获取验证码失败！'))
        }
    },

    // 用户注册
    async userRegister({ commit }, user) {
        const res = await reqUserRegister(user)
        if (res.code == 200) {
            return 'ok'
        }
        else {
            return Promise.reject(new Error('filed 注册失败，内容输入错误！'))
        }
    },

    // 用户登录
    async userLogin({ commit }, data) {
        const res = await reqUserLogin(data)
        if (res.code == 200) {
            commit('USERLOGIN', res.data.token)
            // 持久化本地存储
            localStorage.setItem('TOKEN', res.data.token)
        }
        else {
            return Promise.reject(new Error('filed 账号或密码错误'))
        }
    },

    // 用户用户信息
    async getUserInfo({ commit }) {
        const res = await reqGetUserInfo()
        if (res.code == 200) {
            commit('USERINFO', res.data)
        }
    },

    // 用户退出登录 ：发起请求，清除用户数据
    async userLogout({ commit }) {
        const res = await reqUserLogout()
        if (res.code == 200) {
            commit("CLEARUSERINFO")
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}