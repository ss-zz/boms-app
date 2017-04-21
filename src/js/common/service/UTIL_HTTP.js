// http请求
app.factory('UTIL_HTTP', function($http, $q, $state, UTIL_LOADING, UTIL_DIALOG, UTIL_USER, APPCONFIG ){

  function sendHttp(params){
    if(!params) return;

    // 是否验证结果格式
    params.isValidResult = params.isValidResult === undefined
      ? true : params.isValidResult;

    var deferred = $q.defer();
    //增加token
    UTIL_USER.getToken().then(function(token){
      //是否显示loading
      var lastTimeout = null;
    if(params.isShowLoading !== false){
     //延迟显示loading
        var loadingDefferTime = 500;
        lastTimeout = setTimeout(function(){
          UTIL_LOADING.show();
        }, loadingDefferTime);
      }

      var request = {
        url: APPCONFIG.SERVER_URL_PRE + params.url,
        timeout: APPCONFIG.HTTP_TIMEOUT || 20000,
        headers:{
          'content-type': 'application/json',
          'token': token
        }
      };

      params.type = params.type || "GET";
      request.method = params.type;
      if(params.type == "GET"){
        request.params = params.data || {};
      }else{
        request.data = params.data || {};
      }
      request.data = JSON.stringify(request.data);
      $http(request).success(function(data){
        if(lastTimeout){
          clearTimeout(lastTimeout);
          lastTimeout = null;
        }
        UTIL_LOADING.close();
        if(!data) return;

        // 是否验证结果
        if(!params.isValidResult){
          deferred.resolve(data);
          return;
        }

        if(data.statecode === "200"){//成功
          deferred.resolve(data.response);
        }else if(data.statecode === "201"){//失败
          if(params.isShowLoading !== false){
            UTIL_DIALOG.show(data.msg || "加载失败");
          }
          deferred.reject("加载失败");
        }else if(data.statecode === "202"){//未登陆
          $state.go("login");
        }else{
          if(params.isShowLoading !== false){
            UTIL_DIALOG.show(data.msg || "加载失败");
          }
        }
      }).error(function(data, header, config, status){
        if(lastTimeout){
          clearTimeout(lastTimeout);
          lastTimeout = null;
        }
        UTIL_LOADING.close();
        if(params.isShowLoading !== false){
          UTIL_DIALOG.show(data && data.msg ? data.msg : "请求失败");
        }
        deferred.reject("请求失败");
      });
    });

    return deferred.promise;
  }

  return {
    /* get、post等请求
    {
      url: "",//url
      data: {},//参数
      isValidResult: true,//是否验证返回的结果格式
      isShowLoading: true,//是否显示加载-默认：是
    }
    */
    get: function(data){
      var reqData = data;
      if(reqData){
        reqData.type = "GET";
      }else{
        reqData = {type: "GET"};
      }
      return sendHttp(reqData);
    },
    post: function(data){
      var reqData = data;
      if(reqData){
        reqData.type = "POST";
      }else{
        reqData = {type: "POST"};
      }
      return sendHttp(reqData);
    },
    put: function(data){
      var reqData = data;
      if(reqData){
        reqData.type = "PUT";
      }else{
        reqData = {type: "PUT"};
      }
      return sendHttp(reqData);
    },
    patch:function(data){
      var reqData = data;
      if(reqData){
        reqData.type = "PATCH";
      }else{
        reqData = {type: "PATCH"};
      }
      return sendHttp(reqData);
    },
    delete: function(data){
      var reqData = data;
      if(reqData){
        reqData.type = "DELETE";
      }else{
        reqData = {type: "DELETE"};
      }
      return sendHttp(reqData);
    }

  };

});