// 对axios进行二次封装
import axios from 'axios'
// 引入store
import store from '@/store'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start 进度条开始 done进度条结束

const request = axios.create({
    // 配置默认根路径
    baseURL: '/api',
    // 配置超时时间
    timeout: 5000,
})

// 配置请求拦截器,在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {
    nprogress.start() //进度条开始
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 将当前用户的token配置到headers中，进行身份标识
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    return config
})

// 配置响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done() // 进度条结束
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(error);
})

export default request