// app配置常量
app.constant('APPCONFIG', {
  // 版本号
  VERSION: "0.0.1",
  // 是否web发布（影响部分web不支持的功能）
  IS_WEB: false,
  // 服务端接口地址
  SERVER_URL_PRE: "http://119.61.64.104:8777/HealthServer/api/v1",
  // 每页查询数据条数，根据服务端接口的不同，此参数可能未使用
  PAGE_SIZE: 10,
  // http请求超时时间-ms
  HTTP_TIMEOUT: 10000
});
