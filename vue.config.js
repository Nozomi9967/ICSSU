const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://localhost:8080'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@config': path.resolve(__dirname, './config.js'),
      },
    },
  },
})
