const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  // 通过chainWebpack自定义打包入口
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口
      // add添加新的打包入口
      config.entry('app').clear().add('./src/main-prod.js')

      // 通过externals加载外部CDN资源
      config.set('externals', {
        //包名：全局变量
        vue: 'Vue',
        axios: 'axios',
        'ant-design-vue': 'antd'
      })
      // 通过插件定制首页内容
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      // 通过插件定制首页内容
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  transpileDependencies: true,
  configureWebpack: {
    externals: 'hls.js'
  }, // 在这配置webpack的externals这个字段
})