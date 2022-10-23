// 导入路由组件
// 懒加载
const Home = () => import('@/views/home/Home')
const Search = () => import('@/views/search/Search')
const Login = () => import('@/views/login/Login')
const Regitser = () => import('@/views/register/Register')
const Detail = () => import('@/views/detail/Detail')
const ShopCart = () => import('@/views/shopCart/ShopCart')
const AddCartSuccess = () => import('@/views/addCartSuccess/AddCartSuccess')
const Tarde = () => import('@/views/trade/Tarde')

export default [
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
        path: '/tarde',
        component: Tarde,
        meta: {
            show: true
        }
    }
]