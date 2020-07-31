const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/vue-mobile/",
  devServer: {
    port: 8099,
    proxy: {
      "/proxy": {
        target: "http://baidu.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/proxy": "",
        },
      },
    },
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/Theme.scss";`,
      },
    },
  },
  configureWebpack: (config) => {
    config.resolve.alias["@asset"] = resolve("src/assets");
    config.resolve.alias["@"] = resolve("src");

    if (process.env.VUE_APP_CONSOLE === "true") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
    }

    // 按照自己项目需要配置
    config["externals"] = {};
  },
  chainWebpack: (config) => {
    const imagesRule = config.module.rule("images");
    imagesRule
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 6144 })); // 低于6kb的图片全部被内联，高于6kb的图片会放在单独的img文件夹中

    imagesRule
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true,
      })
      .end();

    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options = {
          symbolId: 'icon-[name]',
        };
        return options;
      });
  },
};
