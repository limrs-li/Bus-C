module.exports = {
  
    publicPath: './',
    devServer: {
      proxy: {
        '/weathers': {
          target: 'https://jiaotong.baidu.com',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/weathers':''
          }
        },
        '/listmessage': {
          target: 'https://jiaotong.baidu.com',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/listmessage':''
          }
        },
        '/cityroad': {
          target: 'https://jiaotong.baidu.com',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/cityroad':''
          }
        },
        
        
      }
    }
  }