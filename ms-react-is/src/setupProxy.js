// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require("http-proxy-middleware");
// const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api1", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: "http://127.0.0.1:5001", //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { "^/api1": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware("/api2", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: "http://127.0.0.1:7700", //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { "^/api2": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware("/api3", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: "http://127.0.0.1:5002", //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { "^/api3": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware("/api4", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: "http://127.0.0.1:5003", //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { "^/api4": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware("/api5", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: "http://127.0.0.1:5004", //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { "^/api5": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  );
};
