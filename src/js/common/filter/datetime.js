//日期过滤器 - {{item | datetime}}
app.filter("datetime", function(DicService){
  return function(code){
    var timestamp = new Date().getTime();
    var timestamp2 = Date.parse(new Date(code));
    var agetime = timestamp - timestamp2;
    agetime = agetime/86400000/365;
    if(agetime > 1){
      return agetime.toFixed(0) + "岁";
    }else{
      return "刚出生" + ( agetime * 365).toFixed(0) + "天";
    }

  }
});