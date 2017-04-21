// 打开外部scheme-如：<div openscheme='SSIONVACC' ext='to=homepage'>免疫接种首页</div>
app.directive('openscheme',
  ["BrowserUtilService", "$timeout", 'SchemeConfig', 'UTIL_DIALOG', '$ionicPopup',
 function(
  BrowserUtilService, $timeout, SchemeConfig, UTIL_DIALOG, $ionicPopup){
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, element, attributes) {

      var platform = null;
      document.addEventListener("deviceready", function(){
        platform = window.device.platform;
      }, false);

      // 唯一标识
      var schemeKey = attributes.openscheme,
        config = SchemeConfig[schemeKey],
        ext = attributes.ext; // 扩展参数

      // 绑定点击事件
      $timeout(function() {
          angular.element(element).on('click', function (evt) {

            if(!config){
              console.error('未配置【' + schemeKey + '】对应的scheme【SchemeConfig.js】');
              return;
            }

            if(!window.device){
              console.error('请在移动设备中测试');
              return;
            }
            if(platform === 'Android' || platform === 'iOS'){
              // 检测安装
              isAppInstalled(config[platform]['appUrl'], function(isInstalled){

                UTIL_DIALOG.show("检测安装成功");

                if(isInstalled){// 已安装
                  openApp(config[platform]['schemeUrl'] + ext || '');
                }else{// 未安装
                  // 提示框
                  var popupConfig = {
                    template: '您还未安装【' + config.desc + '】,是否安装',
                    okText: "安装",
                    okType: "button-balanced",
                    cancelText: '取消',
                    cancelType: "button-stable"
                  };
                  $ionicPopup.confirm(popupConfig)
                    .then(function(res) {
                      if(res) {// 安装
                        var downloadUrl = config[platform]['downloadUrl'];
                        if(downloadUrl){
                          gotoAppDownload(downloadUrl);
                        }else{
                          UTIL_DIALOG.show('应用开发中，敬请期待');
                        }
                      }
                    });
                }
              })
            }else{
              console.error('不支持的设备,当前仅支持Android、iOS');
            }

          });
      });

      // 检测应用是否安装
      function isAppInstalled(appUrl, cb){
        window.appAvailability.check(
          appUrl,
          function(){
            if(cb) cb(true);
          }, function(){
            if(cb) cb(false);
          });
      }
      // 跳转应用安装
      function gotoAppDownload(downloadUrl){
        UTIL_DIALOG.show("准备下载");
        window.open(downloadUrl , '_system');
      }
      // 打开应用
      function openApp(schemeUrl){
        UTIL_DIALOG.show("打开应用" + schemeUrl);
        window.open(schemeUrl, '_system');
      }

    }
  };
}]);