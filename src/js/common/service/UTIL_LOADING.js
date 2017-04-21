// 全局加载中状态
app.factory('UTIL_LOADING', function($ionicLoading){

  return {
    show: function(){
      $ionicLoading.show({
        template: '加载中...'
      });
    },
    close: function(){
      $ionicLoading.hide();
    }
  };
});