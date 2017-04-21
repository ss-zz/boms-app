// 密码重置
app.controller('FindPwdResetPwdCtrl', function($scope, UTIL_DIALOG, $state, UserService, $ionicHistory, $interval) {

  // 从参数中获取电话号码
  var phone = $state.params.phone;
  if(!phone){
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go("findPwdInputPhone");
  }

  // 对象
  $scope.params = {
    phoneNO: phone
  };

  // 找回密码
  $scope.findPwd = function() {
    if(!$scope.params.verifyNO) {
      UTIL_DIALOG.show("请输入验证码");
      return;
    }

    if(!$scope.params.password) {
      UTIL_DIALOG.show("请输入密码");
      return;
    }
    if(!$scope.params.passwordNew) {
      UTIL_DIALOG.show("请输入新密码");
      return;
    }
    if($scope.params.passwordNew != $scope.params.password){
      UTIL_DIALOG.show("两次输入的密码不一致，请重新输入");
      return;
    }

    // 设置密码
    UserService.updatePwd($scope.params).then(function (data) {
      UTIL_DIALOG.show("密码重置成功");
      $ionicHistory.clearHistory();
      $state.go("login");
    });
  };

  // 发送验证码
  $scope.sendSms = function(){
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
