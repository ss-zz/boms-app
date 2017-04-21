// 本地消息通知服务-https://github.com/katzer/cordova-plugin-local-notifications
app.service("LocalNotificationsService",
  function(MessageService, $interval, $state, SPEDATA, UTIL_DIALOG){

  var self = this;

  var timer = null,// 定时器
      intervalTime = 1000 * 60 * 5,// 间隔时间
      LOCAL_KEY_SPEDATA = "SOFTSETALERT",// 本地存储spedata的key-消息提醒设置
      // 提醒声音-暂时无效
      SOUND_ANDROID = "file://audio/alert-android.mp3",
      SOUND_IOS = "file://audio/alert-ios.aiff"
      ;

  // 平台检测
  var platform;
  document.addEventListener('deviceready', function () {
    platform = window.device.platform;
  });

  // 发送本地通知
  self.push = function(items){
    if(!items) return;
    if(!(items instanceof Array)){
      items = [items];
    }
    document.addEventListener('deviceready', function () {
      if(window.cordova){
        var notification = cordova.plugins.notification;
        notification.local.schedule(items);
      }
    }, false);
  };

  // 震动一下
  self.vibrate = function(time){
    time = time || 2000;
    document.addEventListener('deviceready', function () {
      navigator.vibrate(time);
    }, false);
  };

  // 激活消息通知服务
  self.activate = function(){
    // 取消上次
    self.deactivate();
    // 定时更新消息
    timer = $interval(function(){

      // 判断是否设置接收通知
      SPEDATA.get(LOCAL_KEY_SPEDATA)
        .then(function(data){
          var config = {
            MESSAGE_ALERT_ENABLE: true, // 是否提醒
            MESSAGE_ALERT_VOICE_ENABLE: true, // 是否开启声音
            MESSAGE_ALERT_VIBRATION_ENABLE: true // 是否开启震动
          };
          if(data){
            config = JSON.parse(data);
          }
          if(config && config.MESSAGE_ALERT_ENABLE){// 允许提醒
             MessageService.getRemoteMessages()
              .then(function(messages){
                if(messages){
                  var items = [];
                  for(var i in messages){
                    var message = messages[i];
                    var item = {text: message.MESSAGE_CONTENT};
                    // 声音
                    if(config && config.MESSAGE_ALERT_VIBRATION_ENABLE){
                      if(platform === 'Android'){
                        item.sound = SOUND_ANDROID;
                      }else if(platform === 'iOS'){
                        item.sound = SOUND_IOS;
                      }else{
                        item.sound = SOUND_ANDROID;
                      }
                    }
                    items.push(item);
                  }
                  if(items.length > 0){
                    // 推送
                    self.push(items);
                    // 震动
                    if(config && config.MESSAGE_ALERT_VIBRATION_ENABLE){
                      self.vibrate();
                    }
                  }
                }
              });
          }
        });
    }, intervalTime);

    // 监控消息点击事件
    if(window.cordova){
      cordova.plugins.notification.local.on("click", function(notification) {
          // 跳转消息页面
          $state.go("mymessage");
      });
    }

  };

  // 取消激活消息通知
  self.deactivate = function(){
    // 取消定时器
    if(timer){
      $interval.cancel(timer);
      timer = null;
    }
  };

});