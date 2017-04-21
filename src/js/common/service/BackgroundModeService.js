// 后台模式服务-https://github.com/katzer/cordova-plugin-background-mode
app.service("BackgroundModeService",
  function(LocalNotificationsService){

  var self = this;

  // 启动后台模式
  self.run = function(){

    document.addEventListener('deviceready', function () {
      if(window.cordova){
        var backgroundMode = cordova.plugins.backgroundMode;

        // 测试
        LocalNotificationsService.activate();

        backgroundMode.setDefaults({ silent: true });
        // 启动后台
        backgroundMode.enable();
        // 后台事件监听
        // 可选事件-enable, disable, activate, deactivate, failure
        // 激活后台
        backgroundMode.on('activate', function(eve){
          // 激活消息通知
          LocalNotificationsService.activate();
        });
        // 激活前台
        backgroundMode.on('deactivate', function(eve){
          // 取消激活消息通知
          LocalNotificationsService.deactivate();
        });
      }
    }, false);

  };

});