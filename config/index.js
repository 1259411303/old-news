// 项目配置文件
// 定义开发环境和生产环境中所需要的参数
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// path是node.js的路径模块，用来处理路径统一的问题
const path = require('path')

module.exports = {
  dev: {
    // 引入当前目录下的dev.env.js，用来指明开发环境，详见(2)
    // env: require('./dev.env'),
    // vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
    proxyTable: {
      '/list': {
          target: 'http://api.xxxxxxxx.com', // 目标url地址
          changeOrigin: true, // 指示是否跨域
          pathRewrite: {
          '^/list': '/list' // 可以使用 /list 等价于 api.xxxxxxxx.com/list
          }
      }
    },

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    //主机名
    host: 'localhost', // can be overwritten by process.env.HOST
//  host: 'localhost',
		// 下面是dev-server的端口号，可以自行更改
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 下面表示是否自定代开浏览器
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    // 是否生成css，map文件，上面这段英文就是说使用这个cssmap可能存在问题，但是按照经验，问题不大，可以使用
    // 给人觉得没必要用这个，css出了问题，直接控制台不就完事了
    cssSourceMap: true
  },
//	build打包设置
// 下面是build也就是生产编译环境下的一些配置
  build: {
    // 导入prod.env.js配置文件，只要用来指定当前环境，详细见(1)
    env: require('./prod.env'),
    // 下面是相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是dist/index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // 下面定义的是静态资源的根目录 也就是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 下面定义的是静态资源根目录的子目录static，也就是dist目录下面的static
    assetsSubDirectory: 'static',
    // 下面定义的是静态资源的公开路径，也就是真正的引用路径
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    // 下面定义是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,
    // 下面定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
