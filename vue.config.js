module.exports = {
  publicPath: './',

  assetsDir: 'static',

  // 配置 webpack-dev-server 行为。
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://36d.kdwaimai./jkb_cjzq_test',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/assets/css/variables.styl'
        ]
      }
    }
  },

  pluginOptions: {
  }
}
