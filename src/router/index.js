// 配置路由(导入vue/vue-router)
import vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用路由插件
vue.use(VueRouter)

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

const router = new VueRouter({
    // 配置路由
    routes,
    mode: "history",

    // scrollBehavior, 控制路由的滚动行为，可以设置路由跳转之后距离页面顶部的距离
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },

})

router.beforeEach((to, form, next) => {
    let token = store.state.user.token
    // 用户登录了
    if (token) {
        // 如果用户登录之后想要去登录页面或者注册页面，则阻止其行为
        if (to.path == '/login' || to.path == "/register") {
            next('/home')
        } else {
            // 不是则放行
            next()
        }
    }
    // 用户没有登录
    else {
        // 如果用户没有登录想要前往添加商品页面或者购物车页面，阻止其行为
        if (to.path == '/addcartcuccess' || to.path == '/shopcart') {
            alert('请先进行登录')
            next('/login')
        }
        // 不是上面两个页面则放行
        next()
    }
})
export default router


