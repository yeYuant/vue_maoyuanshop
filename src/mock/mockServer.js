// 引入mockjs模块  mockjs是前台模拟后台数据的一种手段，可以方便我们模拟数据，测试
import Mock from 'mockjs'
// 把JSON数据格式引入进来【JSON数据格式不需要对外暴露就可以引入】
// webpakc默认对外暴露的： 图片、JSON数据格式    
import banner from './banner.json'
import floor from './floor.json'

// 使用mock模拟数据 
// 需要传入两个参数：第一个：请求对象地址  第二个：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })