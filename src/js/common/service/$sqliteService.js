// qlite存储
app.service("$sqliteService", function($q, $cordovaSQLite, APPCONFIG, $log, SqlInit, UTIL_DIALOG){

  var self = this;
  var _db;
  self.db = function () {
    if (!_db) {
      if (window.sqlitePlugin !== undefined) {
        _db = window.sqlitePlugin.openDatabase({ name: SqlInit.dbname, location: 2, createFromLocation: 1 });
      } else {
        // For debugging in the browser
        _db = window.openDatabase(SqlInit.dbname, "1.0", "Database", 200000);
      }
      self.initTables();
    }
    return _db;
  };

  //执行sql
  self.executeSql = function (query, parameters) {
    var deferred = $q.defer();
    $cordovaSQLite
      .execute(self.db(), query, parameters)
      .then(function (res) {
        var items = [];
        for (var i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
        deferred.resolve(items);
    }, function (err) {
      $log.log(err.message);
      UTIL_DIALOG.show(err.message);
      deferred.reject(err);
    });
    return deferred.promise;
  };

  // 批量执行sql
  self.executeBatchSql = function(sqls){
    var deferred = $q.defer();
    // if (window.sqlitePlugin !== undefined) {// app
    //   self.db().sqlBatch(sqls, function(){
    //     deferred.resolve();
    //     // 更新lasttime
    //     self.setLastTime(module, lastTime);
    //   }, function(){
    //     deferred.reject();
    //   });
    // } else {// 浏览器
      self.db().transaction(function (tx) {
        for(var i in sqls){
          var sql = sqls[i];
          tx.executeSql(sql[0], sql[1]);
        }
        deferred.resolve();
      });
    // }
    return deferred.promise;
  };

  //初始化数据库
  self.initTables = function () {
    var deferred = $q.defer();
    var sqls = SqlInit.sqls;
    self.db().transaction(function (tx) {
      for (var i = 0; i < sqls.length; i++) {
        var query = sqls[i].replace(/\\n/g, '\n');
        tx.executeSql(query);
      }
    }, function (error) {
      deferred.reject(error);
    }, function () {
      deferred.resolve("OK");
    });
    return deferred.promise;
  };

});