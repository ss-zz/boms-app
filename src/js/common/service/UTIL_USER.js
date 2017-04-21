// 用户状态相关
app.factory('UTIL_USER', function($q, SPEDATA, $ionicHistory, UTIL_DIALOG){

  var userInfoKey = "USER_INFO";

  //获取登录用户信息
  var getUserInfo = function(key){
    var deferred = $q.defer();
    SPEDATA.get(userInfoKey).then(function(data){
      if(data){
        var item = JSON.parse(data);
        if(key){
          deferred.resolve(item[key]);
        }else{
          deferred.resolve(item);
        }
      }else{
        deferred.resolve(null);
      }
    }, function(){
      deferred.reject();
    });
    return deferred.promise;
  };

  return {
    //是否登录
    isLogin: function(){
      var deferred = $q.defer();
      getUserInfo().then(function(userInfo){
        var isLogin = false;
        if(!userInfo){
          isLogin = false;
        }else{
          isLogin = true;
        }
        deferred.resolve(isLogin);
      });
      return deferred.promise;
    },
    //获取用户id
    getUserId: function(){
      return getUserInfo("id");
    },
    //user info
    getUser: function(){
      return getUserInfo();
    },
    //token
    getToken: function(){
      return getUserInfo("token");
    },
    //设置用户信息
    setUserInfo: function(info){
      var deferred = $q.defer();
      SPEDATA.set(userInfoKey, JSON.stringify(info))
        .then(function(){
          deferred.resolve();
        }, function(){
          deferred.reject();
        });
      return deferred.promise;
    },
    //用户登出
    logout: function(){
      var deferred = $q.defer();
      SPEDATA.del(userInfoKey).then(function(){
        $ionicHistory.clearCache();
        deferred.resolve();
      }, function(){
        deferred.reject();
      });
      return deferred.promise;
    }
  };
});