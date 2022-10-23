// 当前这个模块：是对API 进行统一管理
// 引入二次封装的axios（带有请求、响应的拦截器）
import requests from "./request";
import mockReuqest from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList  get请求 无参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起axios请求，获取三级联动菜单的数据，这个函数只需要把服务器返回的结果返回即可
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 切记，当前函数执行需要将服务器的结果返回

// 获取banner（home轮播图接口）
export const reqBannerList = () => mockReuqest({ url: '/banner', method: 'get' })

// 获取floor（家用电器接口）
export const reqFloorList = () => mockReuqest({ url: '/floor', method: 'get' })

// 获取search 详情页信息  地址：/api/list  请求方式：post 参数：需要带参数
// 这个函数需要接收外部传递参数
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品详情的接口   接口：api/item/{skuId}   请求方式：get
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

// 添加到购物车（或者对已有物品进行数量的改动）   接口：/api/cart/addToCart/{ skuId }/{ skuNum }  请求方式： post
export const reqAddOrUpDateShopcart = (skuId, skuNum) => requests({ url: `cart/addToCart/${skuId}/${skuNum} `, method: 'post' })

// 获取购物车列表  接口：/api/cart/cartList  请求方式：get
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: "get" })

// 删除当前选中商品的接口  接口：/api/cart/deleteCart/{skuId}  请求方式 ：delete  携带参数：skuId
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 切换商品选中状态 接口：/api/cart/checkCart/{skuID}/{isChecked}  请求方式：get
export const reqCartCheckById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码 接口：/api/user/passport/sendCode/phone 请求方式 ：get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 用户完成注册 接口：/api/user/passport/register 请求方式 ：post  携带参数:phone password code 
export const reqUserRegister = (data) => requests({ url: '/user/passport/register ', data, method: 'post' })

// 用户登录接口 接口：/api/user/passport/login 请求方式：post 参数：phone、pasword
export const reqUserLogin = (data) => requests({ url: '/user/passport/login ', data, method: 'post' })

// 获取用户的信息 ：需要携带用户的token想服务器要数据 接口/api/user/passport/auth/getUserInfo 请求方式：get   无参数
export const reqGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 用户退出登录 接口：/user/passport/logout  请求方式：get  无参数
export const reqUserLogout = () => requests({ url: "/user/passport/logout", method: 'get' })
