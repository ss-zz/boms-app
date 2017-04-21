// 首页相关服务
app.service("HomeService",
  function($q){

  var self = this;

  var DEMODATA_NEWS = [
    {ID:1, TITLE: "吃素准妈妈包含营养全公开", CHANNEL_DESC: "母婴", PUB_TIME: "", VIEW_COUNT:372 , COVER: "img/homepage/u98.png"},
    {ID:2, TITLE: "三九来临，高血压患者如何安全渡冬", CHANNEL_DESC: "慢病", PUB_TIME: "", VIEW_COUNT:372 , COVER: "img/homepage/u447.png"},
    {ID:3, TITLE: "如何调理气血", CHANNEL_DESC: "中医", PUB_TIME: "", VIEW_COUNT:372 , COVER: "img/homepage/u379.png"},
    {ID:4, TITLE: "哪些食物有助预防胃癌", CHANNEL_DESC: "疾控", PUB_TIME: "", VIEW_COUNT:372 , COVER: "img/homepage/u422.png"},
    {ID:5, TITLE: "地震来临时如何做好自救", CHANNEL_DESC: "急救", PUB_TIME: "", VIEW_COUNT:372 , COVER: "img/homepage/u440.png"},
  ];

  /**
   * 获取健康资讯
   */
  self.getNewsHealth = function(){
    var deferred = $q.defer();
    setTimeout(function(){
      deferred.resolve(DEMODATA_NEWS);
    }, 200);
    return deferred.promise;
  };

  /**
   * 获取滚动资讯
   */
  self.getNewsSlide = function(){
    var deferred = $q.defer();
    setTimeout(function(){
      deferred.resolve(DEMODATA_NEWS);
    }, 200);
    return deferred.promise;
  };

});