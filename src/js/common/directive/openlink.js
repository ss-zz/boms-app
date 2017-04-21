// 打开外部连接-如：<div openlink='http://www.baidu.com'></div>
app.directive('openlink', ["BrowserUtilService", "$timeout",
 function(BrowserUtilService, $timeout){
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, element, attributes) {
      $timeout(function() {
          angular.element(element).on('click', function (evt) {
              var ref = BrowserUtilService.open(
                attributes.openlink,
                '_blank',
                'location=yes'
              );
          });
      });
    }
  };
}]);