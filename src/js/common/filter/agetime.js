//年龄过滤器 - {{item | agetime}}
app.filter("agetime", function(DicService){
  return function(code){
    var timestamp = new Date().getTime();
    var timestamp2 = Date.parse(new Date(code));
    var agetime = timestamp - timestamp2;
    agetime = (agetime/86400000/365).toFixed(1);
    return agetime;
  }
});