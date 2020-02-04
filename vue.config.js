module.exports = {
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        importLoaders: 1,
      },
      less: {
        // 这里的选项会传递给 postcss-loader
        importLoaders: 1,
      }
    }
  }
};