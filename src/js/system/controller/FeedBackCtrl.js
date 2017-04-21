// 意见反馈
app.controller('FeedBackCtrl', function(
  $scope, SystemService, $state, UTIL_DIALOG, $ionicHistory) {

  // 页面数据
  $scope.params = {};

  // 提交
  $scope.submit = function(){
    if(valid()){
      SystemService.feedBack($scope.params)
        .then(function(items){
          UTIL_DIALOG.show("反馈成功");
          $ionicHistory.goBack();
        });
    }
  };

  // 验证参数
  function valid(){
    var content = $scope.params.feedBackMessage;
    if(!content){
      UTIL_DIALOG.show("请输入反馈内容");
      return false;
    }
    if(content.length > 500){
      UTIL_DIALOG.show("反馈内容不能大于500个字");
      return false;
    }

    return true;
  }

});