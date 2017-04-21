// 短信验证码登录
app.controller('LoginSmsCtrl', function($scope, UTIL_DIALOG, $state, UserService, $ionicHistory) {

  // 从参数中获取电话号码
  var phone = $state.params.phone;
  if(!phone){
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go("smsLoginInputPhone");
  }

  // 登录对象
  $scope.params = {
    phoneNO: phone
  };

  // 登录
  $scope.smsLogin = function() {
    if(!$scope.params.verifyNO) {
      UTIL_DIALOG.show("请输入验证码");
      return;
    }

    // 登录
    UserService.smsLogin($scope.params).then(function (data) {
      UTIL_DIALOG.show("登录成功");
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go("homepage");
    });
  };

  // 发送验证码
  $scope.sendSms = function(){
    if (!UserService.validPhone($scope.params.phoneNO)) {
      return;
    }
    beginSmsCountDown();
    UserService.sendSms({
      phoneNO: $scope.params.phoneNO,
      isShowLoading: false
    });
  };
  // 短信倒计时
  var countSms = 60;
  function beginSmsCountDown(){
    $scope.isCountDown = true;
    $scope.countDown = countSms;
    $interval(function(){
      $scope.countDown--;
      if($scope.countDown == 0){
        $scope.isCountDown = false;
      }
    }, 1000, countSms);
  }

})
