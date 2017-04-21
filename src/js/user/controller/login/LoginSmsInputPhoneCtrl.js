// 短信验证码登录-输入手机号
app.controller('LoginSmsInputPhoneCtrl', function($scope, $state, UserService, UTIL_DIALOG) {

  // 对象
  $scope.params = {};

  // 获取验证码
  $scope.sendSms = function(){
    if (!UserService.validPhone($scope.params.phoneNO)) {
      return;
    }
    UserService.sendSms({
      phoneNO: $scope.params.phoneNO,
      isShowLoading: false
    });
    // 跳转短信登录
    $state.go("smsLogin", {phone: $scope.params.phoneNO});
  };

})
