// 本地列表数据存储服务
app.service("ListDataLocalService", function($q, $sqliteService, UTIL_USER){

  // 默认上次时间
  var DEFAULT_LASTTIME = '1990-01-01 00:00:00';
  // 数据删除状态
  var DATASTATE_DELETE = "03";

  var self = this;

  // 验证模块
  self.validModule = function(module){
    if(!module) throw 'module不能为空';
  }

  // 根据module获取上次时间数据
  self.getDataByModule = function(module, otherKey){
    self.validModule(module);
    var deferred = $q.defer();
    UTIL_USER.getUserId()
      .then(function(userId){
        if(otherKey){
          userId += otherKey;
        }
        $sqliteService.executeSql(
          "select * from listdata_lasttime_local where module = ? and user_id = ? ", [module, userId])
          .then(function(data){
            if(data && data.length > 0){// 有数据
              deferred.resolve(data[0]);
            }else{// 无数据
              deferred.resolve();
            }
          }, function(){
            deferred.reject();
          });
      }, function(){
        deferred.reject();
      });

    return deferred.promise;
  };

  // 获取模块的上次更新时间
  self.getLastTime = function(module, otherKey){
    var deferred = $q.defer();
    self.getDataByModule(module, otherKey)
      .then(function(data){
        deferred.resolve(data ? data.last_time : DEFAULT_LASTTIME);
      }, function(){
        deferred.reject();
      });
    return deferred.promise;
  };

  // 设置模块的上次更新时间
  self.setLastTime = function(module, lastTime, otherKey){
    var deferred = $q.defer();
    self.getDataByModule(module)
      .then(function(data){
         UTIL_USER.getUserId()
          .then(function(userId){
            if(otherKey){
              userId += otherKey;
            }
            // 删除
            $sqliteService.executeSql(
              "delete from listdata_lasttime_local where module = ? and user_id = ? ",
              [module, userId])
              .then(function(){
                // 插入
                $sqliteService.executeSql(
                  "insert into listdata_lasttime_local (module, last_time, user_id) values (?, ?, ?) ",
                  [module, lastTime, userId]);
              });
          }, function(){
            deferred.reject();
          });
      }, function(){
        deferred.reject();
      });
    return deferred.promise;
  };

  // 比较两个时间
  self.isGreateThan = function(time1, time2){
    if(!time1) return false;
    if(!time2) return true;
    return time1 > time2 ? true : false;
  };

  /**
   * 数据插入本地同时更新lasttime
   * items中必须包含属性ID和orderTimeField所定义属性，否则数据会被忽略
   * items-数据列表，可为单条数据，
   * orderTimeField-时间字段，
   * module-模块名，
   * isUpdateLastTime-是否更新加载时间,
   * otherKey-其他用于标记数据归属的内容
   */
  self.insertListData = function(items, orderTimeField, module, isUpdateLastTime, otherKey){
    var deferred = $q.defer();
    if(items == null) {
      setTimeout(function(){
        deferred.resolve();
      }, 100);
    }else{
      if(!(items instanceof Array)){
        items = [items];
      }
      var size = items.length;
      if(size == 0) {
        setTimeout(function(){
          deferred.resolve();
        }, 100);
      }else{
        var lastTime = DEFAULT_LASTTIME;
        UTIL_USER.getUserId()
          .then(function(userId){
            if(otherKey){
              userId += otherKey;
            }
            // 待执行sql
            var sqls = [];
            var ids = [];
            for(var i in items){
              var item = items[i];
              var id = item.ID;// 数据id
              // 忽略没有id的数据
              if(!id){
                continue;
              }
              ids.push("'" + id + "'");
              var orderTime = item[orderTimeField];
              // 忽略没有ordertime字段的数据
              if(!orderTimeField || !orderTime){
                continue;
              }

              if(self.isGreateThan(orderTime, lastTime)){
                lastTime = orderTime;
              }
              // 数据状态-新增、编辑、删除
              var dataState = item.STATE_TYPE;
              if(dataState != DATASTATE_DELETE){// 非删除状态的数据才插入
                // 插入sql
                sqls.push(["insert into listdata_local (id, item, order_time, module, user_id) values (?, ?, ?, ?, ?) ", [id, JSON.stringify(item), orderTime, module, userId]]);
              }
            }
            // 删除所有旧数据sql
            sqls.unshift(
              ["delete from listdata_local where module = ? and user_id = ? and id in ("
              + ids.join(",") + ") ", [module, userId]]);

            // 批量执行sql
            $sqliteService.executeBatchSql(sqls)
              .then(function(){
                if(isUpdateLastTime){
                  // 更新lasttime
                  self.setLastTime(module, lastTime, otherKey);
                }
                deferred.resolve();
              }, function(){
                deferred.reject();
              });
          }, function(){
            deferred.reject();
          });
      }
    }
    return deferred.promise;
  };

  // 删除列表中某一数据
  // module-模块名，id-数据id
  self.delById = function(module, id, otherKey){
    var deferred = $q.defer();
    if(!module || !id){
      setTimeout(function(){
        deferred.resolve();
      }, 100);
    }else{
      UTIL_USER.getUserId()
        .then(function(userId){
          if(otherKey){
            userId += otherKey;
          }
          $sqliteService.executeSql(
            "delete from listdata_local where module = ? and user_id = ? and id = ? ",
            [module, userId, id])
            .then(function(){
              deferred.resolve();
            }, function(){
              deferred.reject();
            });
        }, function(){
          deferred.reject();
        });
    }
    return deferred.promise;
  };

  // 获取数据列表
  // module-模块名，maxTime-最大时间，limit-数据量,orderTimeField-日期字段,id-唯一id
  self.getListData = function(module, maxTime, limit, orderTimeField, id, otherKey){
    var deferred = $q.defer();

    UTIL_USER.getUserId()
      .then(function(userId){
        if(otherKey){
          userId += otherKey;
        }
        var params = [module, userId];
        var sql = " select * from listdata_local where module = ? and user_id = ? ";
        if(id){
          sql += " and id = ? "
          params.push(id);
        }
        if(maxTime){
          sql += " and order_time < ? "
          params.push(maxTime);
        }
        sql += " order by order_time desc ";
        if(limit){
          sql += " limit ? ";
          params.push(limit);
        }
        $sqliteService.executeSql(sql, params)
          .then(function(data){
            var maxTime = null;
            var items = [];
            for(var i in data){
              var item = JSON.parse(data[i].item);
              items.push(item);
              var id = item.ID;// 数据id
              var orderTime = item[orderTimeField];
              maxTime = !maxTime ? orderTime
                : (self.isGreateThan(maxTime, orderTime) ? orderTime : maxTime);
            }
            deferred.resolve({items: items, maxTime: maxTime});
          }, function(){
            deferred.reject();
          });
      }, function(){
        deferred.reject();
      });

    return deferred.promise;
  };

});