// 系统服务
app.service('SystemService',function(
  UTIL_HTTP, $q){
  return{
    // 意见反馈
    feedBack: function(params){
      var deferred = $q.defer();
      setTimeout(function(){
        deferred.resolve();
      }, 100);
      return deferred.promise;
    }
  };
});