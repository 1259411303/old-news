// wabpack开发环境配置
'use strict'
// 引入当前目录中的utils工具配置文件
const utils = require('./utils');
// 引入webpack来使用webpack内置插件
const webpack = require('webpack');
// 引入config目录中的index.js配置文件
const config = require('../config');
// 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
const merge = require('webpack-merge');
const path = require('path');
// 引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 下面是一个自动生成html的插件，能够把资源自动加载到html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 下面这个插件是用来把webpack的错误和日志收集起来，漂亮的展示给用户
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');




//setting sun
//模拟本地数据    链接https://blog.csdn.net/qq_36543956/article/details/79712263
const express = require('express')
const app = express()
var homeApi = require('../mock/app.json')
var sellerApi = require('../mock/data.json')   //加载本地数据文件
var goodsApi = require('../mock/stars.json')
var apiRoutes = express.Router()
app.use('/api', apiRoutes)


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


// 下面是合并配置对象，将这个配置文件特有的配置添加替换到base配置文件中
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 下面是把utils配置中的处理css类似文件的处理方法拿过来，并且不生成cssMap文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // debtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    //setting sun 
    before(app) {
      app.post('/api/home', (req, res) => {
        res.json({
          result: 1,
          data: homeApi.data
        })
      }),
      app.get('/api/seller', (req, res) => {
        res.json({
          result: 1,
          data: sellerApi.data
        })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
      }),
      app.get('/api/goods', (req, res) => {
        res.json({
          result: 1,
          data: goodsApi.data
        })
      })
      //这里逗号会运行报错
    },


    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // DefinePlugin内置webpack插件，专门用来定义全局变量的，下面定义一个全局变量 process.env
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中，你还不知道
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true//设置为true表示把所有的js文件都放在body标签的屁股
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
