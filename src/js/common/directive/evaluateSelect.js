//星星评价选择
app.directive('evaluateSelect', [function(){
  return {
    restrict: 'E',
    scope: {
      ngModel: "=",//绑定的值
      disable: "="//是否禁用-不可选择
    },
    replace: true,
    templateUrl: "common/directive/views/evaluateSelect.html",
    link: function($scope, el, attrs, controller) {

      $scope.range = [1, 2, 3, 4, 5];
      if(!$scope.ngModel){
        $scope.ngModel = 0;
      }

      $scope.click = function(val){
        if(!$scope.disable){
          $scope.ngModel = val;
        }
      };

    }
  };
}]);