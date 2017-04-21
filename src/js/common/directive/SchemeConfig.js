/**
 * scheme配置
 */
app.service("SchemeConfig", function(){

  // 配置
  var SCHEMECONFIG = {
    'SSIONVACC': {
      'desc': '免疫接种',
      'Android': {
        appUrl: 'cn.com.sinosoft.ionic.vacc',
        schemeUrl: 'ssionvacc://',
        downloadUrl: null
      },
      'IOS': {
        appUrl: 'ssionvacc://',
        schemeUrl: 'ssionvacc://',
        downloadUrl: null
      }
    }
  };

  return SCHEMECONFIG;

});