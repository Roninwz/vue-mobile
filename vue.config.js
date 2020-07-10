const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/vue-mobile/',
  devServer: {
    port: 8099,
    proxy: {
      '/proxy': {
        target: 'http://baidu.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      },
    }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/Theme.scss";`
      }
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias['@asset'] = resolve('src/assets')
    config.resolve.alias['@'] = resolve('src')

    if (process.env.VUE_APP_CONSOLE === 'true') {
      config.optimization.minimizer[
        new UglifyJsPlugin({
          uglifyOptions: {
            sourceMap: true,
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ]
    }

    // 按照自己项目需要配置
    config['externals'] = {
    }
  },
  chainWebpack: config => {
    const imagesRule = config.module.rule('images')
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 6144 })) // 低于6kb的图片全部被内联，高于6kb的图片会放在单独的img文件夹中

    imagesRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
}