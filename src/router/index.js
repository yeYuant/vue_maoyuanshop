// 配置路由(导入vue/vue-router)
import vue from 'vue'
import VueRouter from 'vue-router'

// 使用路由插件
vue.use(VueRouter)

// 导入路由组件
// 懒加载
const Home = () => import('@/views/home/Home')
const Search = () => import('@/views/search/Search')
const Login = () => import('@/views/login/Login')
const Regitser = () => import('@/views/register/Register')

const router = new VueRouter({
    // 配置路由
    routes: [
        // 配置重定向,访问 / 立即跳转到home 首页
        {
            path: '/',
            redirect: '/home',

        },
        {
            path: '/home',
            component: Home,
            // 路由元信息
            meta: {
                show: true
            }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'search',
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Regitser,
            meta: {
                show: false
            }
        },
    ],
    mode: "history"

})

// 先把VueRouter原型对象的push、replace保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数，告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数，成功的回调
// 第三个参数，失败的回调
// call||apply的区别
// 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
// 不通电，call与apply传递参数：call传递参数用逗号隔开，apply使用数组
VueRouter.prototype.push = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, localtion, resolve, reject)
    } else {
        originPush.call(this, localtion, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, localtion, resolve, reject)
    } else {
        originReplace.call(this, localtion, () => { }, () => { })
    }
}


export default router