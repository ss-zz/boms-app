// 主页面tabs
app.directive('agTabs',
  ['$state', '$ionicHistory', '$ionicTabsDelegate',
  function($state, $ionicHistory, $ionicTabsDelegate){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'tabs.html',
    link: function($scope) {
      // 选中标签
      var select = 0;
      var currentView = $ionicHistory.currentView().stateName;
      var viewMap = {
        'news': 0,
        'govInfo': 1,
        'homepage': 2,
        'servHall': 3,
        'my': 4
      };
      $scope.select = viewMap[currentView];
      $scope.to = function(uiSref){
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go(uiSref);
      }
    }
  };
}]);