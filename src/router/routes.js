// 导入路由组件
// 懒加载
const Home = () => import('@/views/home/Home')
const Search = () => import('@/views/search/Search')
const Login = () => import('@/views/login/Login')
const Regitser = () => import('@/views/register/Register')
const Detail = () => import('@/views/detail/Detail')
const ShopCart = () => import('@/views/shopCart/ShopCart')
const AddCartSuccess = () => import('@/views/addCartSuccess/AddCartSuccess')
const Trade = () => import('@/views/trade/Trade')
const Pay = () => import('@/views/pay/Pay')
const PaySuccess = () => import('@/views/paySuccess/PaySuccess')
const Center = () => import('@/views/center/Center')
const MyOrder = () => import('@/views/center/myOrder/MyOrder')
const GroupOrder = () => import('@/views/center/groupOrder/GroupOrder')

export default [
    // 配置一级路由
    {
        path: '/',
        // 配置重定向,访问 / 立即跳转到home 首页
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
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartcuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫  限制当前路由必须要由特定的路由才可以跳转而来
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(from.path)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        },
        // 路由独享守卫  限制当前路由必须要由特定的路由才可以跳转而来
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(from.path)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        },
        // 路由独享守卫  限制当前路由必须要由特定的路由才可以跳转而来
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(from.path)
            }
        }
    },
    ,
    {
        path: '/center',
        redirect: '/center/myorder',
        component: Center,
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
        ]
    },

]