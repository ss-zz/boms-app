// 转码过滤器- {{item | dicTrans: 'GENDER' }}
app.filter("dicTrans", function(DicService){
  return function(code, type){
    return DicService.getDescByCode(type, code);
  }
});