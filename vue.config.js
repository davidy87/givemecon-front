const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://ec2-52-78-113-173.ap-northeast-2.compute.amazonaws.com:8080'
    // proxy: 'http://localhost:8080'
  }
})
