// 密码找回-输入手机号
app.controller('FindPwdInputPhoneCtrl', function($scope, $state, UserService, UTIL_DIALOG) {

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
    // 跳转重置密码页面
    $state.go("findPwdResetPwd", {phone: $scope.params.phoneNO});
  };

})
