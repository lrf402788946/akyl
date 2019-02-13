const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/akyl/' : './',
  configureWebpack: config => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@a': path.resolve(__dirname, './src/assets'),
        },
      },
    });
  },
  devServer: {
    port: '8001',
    //api地址前缀
    proxy: {
      '/akyl': {
        target: 'http://10.16.11.186:80',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '/akyl': '',
        },
      },
    },
  },
};
