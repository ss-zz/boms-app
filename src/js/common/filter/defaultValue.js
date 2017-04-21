// 默认空值过滤器
app.filter("defaultValue",function(){
  return function(input){
    var out = "";
    if(input==null||input==""){
      out = "未填写"
    }else{
      out=input;
    }
    return out;
  }
});