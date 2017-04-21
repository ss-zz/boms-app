// 首页
app.controller('homeviewCtrl', function(
  $scope,
  $state,
  $ionicHistory,
  $ionicSlideBoxDelegate,
  OfficialAccountsService,
  HomeService) {

  // 页面进入之前刷新数据
  $scope.$on('$ionicView.beforeEnter', function() {

    // 首页tab清除历史
    $ionicHistory.clearHistory();

    $scope.refreshAll();
  });

  // 刷新所有
  $scope.refreshAll = function(){
    // 刷新公众号
    $scope.refreshOfficialAccounts();
    // 刷新资讯
    $scope.refreshNews();
  };

  // 刷新-公众号
  $scope.refreshOfficialAccounts = function(){
    OfficialAccountsService.getSelectedList()
      .then(function(items){
        $scope.itemsOfficialAccounts = items;
      });
  };

  // 刷新-刷新资讯
  $scope.refreshNews = function(){
    HomeService.getNewsHealth()
      .then(function(news){
        $scope.news = news;
      });
    HomeService.getNewsSlide()
      .then(function(news){
        $scope.newsSlide = news;
        $ionicSlideBoxDelegate.update();
      });
  };

});