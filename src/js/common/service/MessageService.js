// 消息服务
app.service("MessageService",
  function(ListDataLocalService, UserService, $q){

  var self = this;
  var remoteLimit = 1000,// 每次获取远程数据条数
      LIST_MODULE = "LIST_MODULE_MESSAGE",// 模块名
      ORDER_TIME_FIELD = "LAST_UPDATE_TIME"// 时间字段
      ;

  // 获取远程消息
  self.getRemoteMessages = function(){
    var deferred = $q.defer();
    // 获取lasttime
    ListDataLocalService.getLastTime(LIST_MODULE)
      .then(function(lastTime){
        // 从服务端加载所有数据
        UserService.getUserMessage({
          lastTime: lastTime,
          limit: remoteLimit
        }).then(function(data){
          if(data && data.userMessagesList){
            // 数据插入本地
            ListDataLocalService.insertListData(
              data.userMessagesList, ORDER_TIME_FIELD, LIST_MODULE, true);
            deferred.resolve(data.userMessagesList);
          }
        });
      });
    return deferred.promise;
  };

});