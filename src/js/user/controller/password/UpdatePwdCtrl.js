// 修改密码
app.controller('UpdatePwdCtrl', function($scope, UTIL_DIALOG, UserService) {

  // 对象
  $scope.params = {};

  // 修改密码
  $scope.updatePwd = function() {
    if(!$scope.params.oldPassword) {
      UTIL_DIALOG.show("请输入您的原始密码");
      return;
    }
    if(!$scope.params.newPassword) {
      UTIL_DIALOG.show("请输入新密码");
      return;
    }
    if(!$scope.params.newPasswordDup) {
      UTIL_DIALOG.show("请再次输入新密码");
      return;
    }
    if($scope.params.newPassword != $scope.params.newPasswordDup){
      UTIL_DIALOG.show("两次输入的新密码不一致，请重新输入");
      return;
    }

    // 设置密码
    UserService.changePwd($scope.params).then(function (data) {
      UTIL_DIALOG.show("密码修改成功");
    });
  };

})
