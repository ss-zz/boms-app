// 智能年龄
app.filter("smartage", function(){
  return function(birthday){
    if(!birthday) return;
    var dateNow = new Date();
    var dateBirthday = new Date(birthday);
    var midTime = dateNow.getTime() - dateBirthday.getTime();
    var desc = null;
    // 相差天
    var day = (midTime/86400000).toFixed(0);
    if(day <= 0){
      return "";
    }
    if(day <= 365){
     return "出生" + day + "天";
    }
    // 相差年
    var year = dateNow.getFullYear() - dateBirthday.getFullYear();
    // 相差月
    var midMonth = dateNow.getMonth() - dateBirthday.getMonth();
    var month = year * 12 + midMonth;
    if(month <= 8*12){
      if(midMonth < 0){
        year = year -1;
        midMonth = 12 + midMonth;
      }
     return year + "岁" + midMonth + "个月";
    }
    return year + "岁";
  }
});