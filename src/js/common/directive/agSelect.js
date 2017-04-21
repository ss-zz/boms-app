// 自定义下拉选择
app.directive('agSelect', ['$ionicPopup', function($ionicPopup){
  return {
    restrict: 'E',
    scope: {
      title: "@",//显示文字
      data: "=",//下拉数据
      value: "=",//绑定的值
      defaultDesc: "=",//默认显示
      defaultValue: "=",//默认值
      change: "&"//切换事件
    },
    replace: true,
    templateUrl: "common/directive/views/agSelect.html",
    link: function(scope, el, attrs, controller) {
      scope.currentDesc = scope.title;

      // 监控默认参数变化
      if(scope.defaultDesc){
        scope.currentDesc = scope.defaultDesc;
      }
      if(scope.defaultValue){
        scope.value = scope.defaultValue;
      }
      scope.$watch('defaultDesc', function(newValue, oldValue, scope){
        if(newValue != oldValue){
          scope.currentDesc = newValue;
        }
      });
      scope.$watch('defaultValue', function(newValue, oldValue, scope){
        if(newValue != oldValue){
          scope.value = newValue;
        }
      });

      // 弹窗
      var myPopup = null;

      // 打开弹窗
      scope.selectClick = function(){
        scope.showSelect = !scope.showSelect
        if(scope.showSelect){// 显示
          myPopup = $ionicPopup.show({
            title: scope.title || "请选择",
            template: '<div class="href cs-select-item"'
                  + 'ng-repeat="item in data"'
                  + 'ng-click="click(item)">'
                  + '{{item.desc}}'
                  + '</div>',
            scope: scope,
            buttons: [
              {text: '关闭',
              type: 'button-assertive',
              onTap: function(e) {
                scope.showSelect = !scope.showSelect
                scope.closePopup();
              }}
            ]
          });
        }else{// 移除
          scope.closePopup();
        }
      };

      // 关闭弹出框
      scope.closePopup = function(){
        if(myPopup){
          myPopup.close();
        }
      };

      // 选中
      scope.click = function(item){
        scope.showSelect = false;
        scope.currentDesc= item.desc;
        scope.value = item.value;
        if(scope.change){
          scope.change(item);
        }
        myPopup.close();
      };
    }
  };
}]);