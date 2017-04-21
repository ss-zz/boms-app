// 自定义后退按钮-独立页面使用
app.directive('agBtnBack', [function(){
  return {
    restrict: 'EA',
    replace: true,
    template: '<ion-nav-buttons side="left"><div class="buttons"><a class="button icon icon-right ion-arrow-left-c" ng-click="$ionicGoBack()"></a></div></ion-nav-buttons>'
  };
}]);