// url相关
app.factory('UTIL_URL', function(){

  //接收页面传来的参数
  var request ={
    QueryString : function(val){
      var uri = window.location.search;
      var re = new RegExp(val+ "=([^&?]*)", "ig");
      return ( (uri.match(re)) ?(uri.match(re)[0].substr(val.length+1)):null);
    }
  };

  return {
    // 从url中获取get参数
    getParamsFromUrl: function(key){
      return decodeURI(request.QueryString(key));
    }
  };
});