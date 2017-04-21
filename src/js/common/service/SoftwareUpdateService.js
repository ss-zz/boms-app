// 软件更新服务
app.service("SoftwareUpdateService",
  function($q, APPCONFIG, SPEDATA, UTIL_HTTP, $ionicPopup, UTIL_DIALOG){

  var self = this,
      LOCAL_KEY_SPEDATA = "IGNOREVERSION",// 本地存储spedata的key-忽略版本号
      localVersion = APPCONFIG.VERSION// 本地版本号

      ;
  // 平台
  var platform = "WEB";
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    platform = window.device.platform;
    if(platform == "iOS"){
      platform = "IOS";
    }
  }

  // 跳转下载页面
  function toDownload(url){
    window.open(url , '_system');
  }

  // 检测版本软件
  self.detectVersion = function(){
    var deferred = $q.defer();

    // web下不检测
    if(platform == "WEB"){
      setTimeout(function(){
        deferred.resolve();
      }, 100);
    }else{
      // 获取lasttime
      UTIL_HTTP.get({
        url: "/software",
        data: {
          softwareVersion: localVersion,
          platform: platform
        }
      })
        .then(function(info){
          if(!info){
            deferred.resolve();
            return;
          }
          if(!info.IS_NEW){// 不是最新
            // 是否强制更新
            var isForce = info.IS_FORCED == 't' ? true : false;
            var newVersion = info.SOFT_VERSION;

            // 获取是否忽略此版本
            SPEDATA.get(LOCAL_KEY_SPEDATA)
              .then(function(version){
                // 是否忽略
                var isIgnore = false;
                isIgnore = newVersion == version ? true : false;
                // 强制更新的不忽略版本
                isIgnore = isForce ? false : isIgnore;
                if(isIgnore) {
                  deferred.resolve();
                  return;
                }

                // 版本弹出框
                var template = "发现新版本：";
                // 最新版本号
                template += info.SOFT_VERSION + "<br/><hr/>";
                // 版本详情
                template += info.VERSION_INFO;

                var popupConfig = {
                  template: template,
                  okText: "更新",
                  okType: "button-balanced"
                };

                if(!isForce){// 非强制性的
                  popupConfig.cancelText = "忽略";
                  popupConfig.cancelType = "button-stable";
                  $ionicPopup.confirm(popupConfig)
                    .then(function(res) {
                      if(res) {// 更新
                        // 跳转更新页面
                        toDownload(info.UPDATE_URL);
                      }else{// 忽略更新
                        SPEDATA.set(LOCAL_KEY_SPEDATA, newVersion);
                      }
                    });
                }else{// 强制性
                  $ionicPopup.alert(popupConfig)
                    .then(function(res) {
                      toDownload(info.UPDATE_URL);
                      // 强制性更新点击下载之后强制退出app
                      // ionic.Platform.exitApp();
                    });
                }
              });
          }
        }, function(){
          UTIL_DIALOG.alert("版本信息检测失败");
        });
    }

    return deferred.promise;
  };

});