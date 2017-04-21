// 主页面tabs
app.directive('zoomImage',
    ['$state', '$ionicHistory', 
        function($state, $ionicHistory, $ionicTabsDelegate){
            return {
                restrict: 'E',
                replace: false,
                templateUrl: 'common/directive/views/zoomimage.html',
                link: function($scope) {
                    scope.bigImage = false;
                 $scope.showImage=function () {
                     scope.bigImage = true;
                     if ($scope.bigImage){

                     }
                     console.log(12213);
                    }
                    scope.hideBigImage = function () {
                        scope.bigImage = false;
                    };
                }
            };
        }]);