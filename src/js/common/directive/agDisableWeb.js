// web环境下移除元素
app.directive('agDisableWeb', ["APPCONFIG", function(APPCONFIG){
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, el, attrs, controller) {
      // web环境下移除元素
      if(APPCONFIG.IS_WEB){
        el.remove();
      }
    }
  };
}]);