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
export const reqSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})