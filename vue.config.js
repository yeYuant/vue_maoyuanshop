const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint 代码矫正提示
  lintOnSave: false,
  // 去除Vue打包后js目录下生成的一些.map文件，用于加速生产环境构建
  productionSourceMap: false,
  // webpack进行服务代理（解决跨域问题）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
