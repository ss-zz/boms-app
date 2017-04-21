// 我的留言
app.controller('MyLeaveMessageCtrl', function($scope, $state, UserService, ListDataLocalService) {

  //是否有更多
  $scope.hasmore = true;
  // 是否在加载数据
  $scope.isRun = false;
  // 变量
  var limit = 20,// 每页条数-本地
      remoteLimit = 1000,// 每次获取远程数据条数
      maxTime = null,// 数据最新时间
      LIST_MODULE = "LIST_MODULE_LEAVEMESSAGE",// 模块名
      ORDER_TIME_FIELD = "MSG_TIME"// 时间字段
      ;

  //加载数据
  function loadData(){
    // 从本地加载数据
    ListDataLocalService.getListData(LIST_MODULE, maxTime, limit, ORDER_TIME_FIELD)
      .then(function(data){
        var items = data.items;
        if(!items || items.length < limit){
          $scope.hasmore = false;
        }
        if(!maxTime){// 刷新
          $scope.items = items;
        }else{// 加载更多
          $scope.items = $scope.items || [];
          $scope.items = $scope.items.concat(items);
        }
        maxTime = data.maxTime;
        loadComplete();
      }, function(){
        loadComplete();
      });
  }

  // 刷新
  $scope.refresh = function(){
    // 获取lasttime
    ListDataLocalService.getLastTime(LIST_MODULE)
      .then(function(lastTime){
        // 从服务端加载所有数据
        UserService.getUserLeaveMessage({
          lastTime: lastTime,
          limit: remoteLimit
        }).then(function(data){
          $scope.hasmore = true;
          maxTime = null;
          // 数据插入本地
          ListDataLocalService.insertListData(
            data.userMessagesList, ORDER_TIME_FIELD, LIST_MODULE, true)
            .then(function(){
              // 显示本地一页数据
              loadData();
            }, function(){
              loadComplete();
            });
        }, function(){
          loadComplete();
        });
      }, function(){
        loadComplete();
      });
  };

  // 加载结束
  function loadComplete(){
    $scope.isRun = false;
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  // 加载更多
  $scope.loadMore = function(){
    if($scope.hasmore){
      $scope.isRun = true;
      loadData();
    }
  };

  //默认加载
  $scope.refresh();

});