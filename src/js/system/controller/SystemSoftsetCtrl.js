// 软件设置
app.controller('SystemSoftsetCtrl', function(
  $scope,
  $state,
  $ionicPopup,
  $ionicHistory,
  UTIL_USER,
  UTIL_DIALOG,
  AppCacheClearService
  ) {

  //用户是否登录
  UTIL_USER.isLogin().then(function(isLogin){
    $scope.isLogin = isLogin;
  });

  //退出登录
  $scope.logout = function(){
    if($scope.isLogin){
      var confirmPopup = $ionicPopup.confirm({
        template: '您已登录，确认退出？',
        okText: "确认",
        okType: "button-balanced",
        cancelText: "取消",
        cancelType: "button-stable"
      });
      confirmPopup.then(function(res) {
        if(res) {
          UTIL_USER.logout().then(function(){
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go("login");
            $scope.isLogin = false;
          });
        }
      });
    }else{
      $state.go("login");
    }
  };

  // 清除缓存
  $scope.clearCache = function(){
    $scope.isClearCache = true;
    AppCacheClearService.clear()
      .then(function(){
        UTIL_DIALOG.alert("缓存清除成功");
        $scope.isClearCache = false;
      }, function(){
        UTIL_DIALOG.alert("缓存清除失败");
        $scope.isClearCache = false;
      });
  };

});