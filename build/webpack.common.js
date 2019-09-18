/*
 * @Author: xuxueliang
 * @Date: 2019-06-20 03:18:16
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-15 19:30:55
 */
// webpack.common.js
const path = require('path')
const config = require('../config')
const utils = require('./utils')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
module.exports = {
  entry: {
    index: './src/index.js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss', 'styl'], // 添加在此的后缀所对应的文件可以省略后缀
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('lib'), resolve('node_modules/yamjs/src'), resolve('node_modules/lib')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // 可以配置输出的css文件路径
            }
          },
          'css-loader'
        ]
      }, {
        test: /\.styl$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.stylus$/,
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'text-loader'
      }
    ]
  }
}
