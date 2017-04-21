// 从本地存储sqllite中读取、设置、删除数据
app.service('SPEDATA', function($q, $sqliteService, $rootScope){

  var self = this;
  // 使用spedata的模块配置
  // isUserShare 是否用户共享
  var SPEDATA_CONFIG = {
    IGNOREVERSION: {isUserShare: true},// 忽略app版本更新
    USER_INFO: {isUserShare: true},// 登录用户信息
    OFFICIAL_ACCOUNTS_SELECTED: {isUserShare: false},// 选中的公众号
    WOMAN_EDOC: {isUserShare: true},// 孕产妇预产期
    WOMAN_EXAM_ALERT: {isUserShare: true}// 孕产妇产检提醒
  };

  // 处理key
  self.getUserId = function(key){
    if(!key){
      return null;
    }
    if(SPEDATA_CONFIG[key] && !SPEDATA_CONFIG[key].isUserShare){
      return $rootScope.EXT.user.id;
    }else{
      return null;
    }
  };

  //读取数据
  self.get = function(key){
    var deferred = $q.defer();
    var userId = self.getUserId(key);
    var sql = "select * from spedata where key = ? ";
    var params = [key];
    if(userId){
      sql += " and user_id = ? ";
      params.push(userId);
    }
    $sqliteService.executeSql(sql, params)
    .then(function(data){
      var value;
      if(data && data.length > 0){
        value = data[0].value;
      }
      deferred.resolve(value);
    }, function(){
      deferred.reject();
    });
    return deferred.promise;
  };
  //设置数据
  self.set = function(key, value){
    var deferred = $q.defer();
    self.del(key)
      .then(function(){
        var userId = self.getUserId(key);
        //插入
        $sqliteService.executeSql(
          "insert into spedata (key, value, user_id) values (?, ?, ?) ", [key, value, userId])
          .then(function(){
            deferred.resolve();
          });;
      }, function(){
        deferred.reject();
      });
    return deferred.promise;
  };
  //删除数据
  self.del = function(key){
    var deferred = $q.defer();
    //删除
    var userId = self.getUserId(key);
    var sql = " delete from spedata where key = ? ";
    var params = [key];
    if(userId){
      sql += " and user_id = ? ";
      params.push(userId);
    }
    $sqliteService.executeSql(sql, params)
      .then(function(){
        deferred.resolve();
      }, function(){
        deferred.reject();
      });
    return deferred.promise;
  };
});