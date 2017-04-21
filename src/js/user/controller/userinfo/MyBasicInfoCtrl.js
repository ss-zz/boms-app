// 个人基本信息
app.controller('MyBasicInfoCtrl', function(
  $scope, UserService) {

  // 页面进入之前刷新数据
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.refresh();
  });

  // 刷新
  $scope.refresh = function(){
    // 获取个人信息
    UserService.getLocalBaseInfo()
    .then(function(data){
      if(data){
        $scope.userInfo = data;
      }
    });
  }

});