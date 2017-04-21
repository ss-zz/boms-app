//登录
app.controller('LoginCtrl', function($scope, UTIL_DIALOG,$state, UserService, $ionicHistory, $ionicActionSheet) {

  // 登录对象
  $scope.params = {};

  // 是否有上一页
  $scope.hasPreState = $ionicHistory.backView() ? true : false;

  // 返回
  $scope.goBack = function(){
    $ionicHistory.goBack();
  };

  // 登录
  $scope.login = function() {
    if (!UserService.validPhone($scope.params.phoneNO)) {
      return;
    }
    if(!$scope.params.password) {
      UTIL_DIALOG.show("请输入密码");
      return;
    }

    // 登录
    UserService.login($scope.params).then(function (data) {
      UTIL_DIALOG.show("登录成功");

      $state.go("homepage");
    });
  };

  // 忘记密码操作
  $scope.showForgetPwd = function(){
    $ionicActionSheet.show({
      buttons: [
        { text: '<span class="color-blue">找回密码</span>' },
        { text: '<span class="color-blue">短信验证码登录</span>' },
      ],
      cancelText: '取消',
      buttonClicked: function(index) {
        if(index == 0){// 找回密码
          $state.go("findPwdInputPhone");
        }else if(index == 1){// 短信验证登录
          $state.go("smsLoginInputPhone");
        }
        return true;
      }
    });
  }

})
