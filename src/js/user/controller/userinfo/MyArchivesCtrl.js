app.controller('MyArchivesCtrl', function($scope, $stateParams,UTIL_DIALOG,$http) {
    //默认第一个为当前
    $scope.currentIndex = 1;
    //TAB页切换
    $scope.getIndex = function (index) {
        $scope.currentIndex = index;
    }
});