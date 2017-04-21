// 打开第三方应用
app.directive('openThirdApp', ["$timeout",
 function($timeout){

  // 应用配置
  var APPCONFIGMAP = {
    'VACC': {// 疫苗接种
      'Android': {
        appUrl: 'cn.com.sinosoft.ionic.vacc',
        schemeUrl: 'mqq://',
        downloadUrl: ''
      },
      'IOS': {
        appUrl: 'mqq://',
        schemeUrl: 'mqq://',
        downloadUrl: 'https://itunes.apple.com/cn/app/qq-2011/id444934666'
      }
    }
  };

  var platform = null;
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    platform = window.device.platform;
  }

  // 检测应用是否安装
  function isAppInstalled(appkey, cb){
    var appUrl = APPCONFIGMAP[appkey][platform]['appUrl'];
    window.appAvailability.check(
      appUrl,
      function(){
        if(cb) cb(true);
      }, function(){
        if(cb) cb(false);
      });
  }

  // 跳转应用安装
  function gotoAppDownload(appkey){
    if(checkAppkey(appkey)){
      var downloadUrl = APPCONFIGMAP[appkey][platform]['downloadUrl'];
      alert("准备下载" + downloadUrl);
      window.open(downloadUrl , '_system');
    }
  }

  // 打开应用-不可用
  function openApp(appkey){
    if(checkAppkey(appkey)){
      window.open(APPCONFIGMAP[appkey][platform]['schemeUrl']);
    }
  }

  // 检测appkey
  function checkAppkey(appkey){
    if(APPCONFIGMAP[appkey] && APPCONFIGMAP[appkey][platform]){
      return true;
    }
    alert('【' + appkey + '】未配置');
    return false;
  }

  return {
    restrict: 'A',
    scope: {
      appkey: "@" //app标识
    },
    replace: false,
    link: function(scope, element, attributes) {

      $timeout(function() {
          angular.element(element).on('click', function (evt) {
              var appkey = scope.appkey;
              if(!window.device){
                alert('请在移动设备中测试');
                return;
              }
              if(platform === 'Android' || platform === 'iOS'){
                isAppInstalled(appkey, function(isInstalled){
                  if(isInstalled){
                    // 打开
                    openApp(appkey);
                  }else{
                    // 跳转下载
                    gotoAppDownload(appkey);
                  }
                })
              }
          });
      });

    }
  };
}]);