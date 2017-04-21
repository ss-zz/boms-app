// 浏览器打开页面工具-http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html
app.service("BrowserUtilService",
  function(LocalNotificationsService){

  var self = this;

  // 打开链接
  function openLink(url, target, options){
    return window.open(url, target, options);
  }

  // 打开链接
  self.open = function(url, target, options){
    return openLink(url, target, options);
  };
  // 打开链接-系统浏览器
  self.openLinkWithSystem = function(url, options){
    return openLink(url, "_system", options);
  };
  // 打开链接-webview
  self.openLinkWithWebview = function(url, options){
    return openLink(url, "_self", options);
  };

});