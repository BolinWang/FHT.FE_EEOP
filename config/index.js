let path = require('path')
let proxyIPs = {
  // YYY: 'http://192.168.5.243:1234/',
  // WANLI: 'http://192.168.1.121:1234/', // 万里小哥哥
  // HONGDENG: 'http://192.168.5.241:1234/' // 水滴灯小哥哥
     ghost:'http://192.168.5.115:1234'
}
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: proxyIPs.YYY,
        target: 'http://192.168.5.123:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: '0.0.0.0', // 请勿修改，localhost/IP均可访问
    port: 9528,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
    useEslint: false,
    showEslintErrorsInOverlay: false
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
