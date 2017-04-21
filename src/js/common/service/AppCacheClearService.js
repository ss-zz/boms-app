// app缓存清除服务
app.service("AppCacheClearService",
  function($q){

  var self = this;

  // 清空缓存
  self.clear = function(){
    var deferred = $q.defer();
    if(!window.cordova){
      deferred.resolve();
    }
    document.addEventListener('deviceready', function(){
      window.cache.clear(function(){
        deferred.resolve();
      }, function(){
        deferred.reject();
      });
    });
    return deferred.promise;
  };
});