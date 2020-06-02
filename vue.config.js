const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'http://39.104.118.74:8001/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: config => {
    config.externals = {
      'echarts': 'echarts'
    }
    let plugins = [
      new BundleAnalyzerPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 1024,
        minRatio: 0.8
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
