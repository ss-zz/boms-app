// 不显示末尾的00:00:00
app.filter("notShowEndZeroTime", function(){
  return function(value){
    if(!value) return;
    if(/^.*00:00:00$/.test(value) && value.length >= 9){
      value = value.substring(0, value.length - 9);
    }
    return value;
  };
});