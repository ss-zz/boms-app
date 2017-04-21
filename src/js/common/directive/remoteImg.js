// 根据id加载远程图片<img remoteImg="id1"  />
app.directive('remoteImg', ['APPCONFIG', function(APPCONFIG){
  return {
    restrict: 'A',
    scope: {
      remoteImg: "="
    },
    replace: false,
    link: function($scope, el, attrs, controller) {

      // 刷新
      function refresh(){
        if($scope.remoteImg){
          el[0].setAttribute('src',
            APPCONFIG.SERVER_URL_PRE + '/img/' + $scope.remoteImg);
        }
      }

      // 监控数据变化
      $scope.$watch('remoteImg', function(){
        refresh();
      }, true);

    }
  };
}]);