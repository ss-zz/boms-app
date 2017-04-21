// echarts
app.directive('echarts', function() {
  return {
    scope: {
      config: "=" // 配置项
    },
    restrict: 'E',
    template: '<div class="charts-tag"></div>',
    replace: true,
    link: function($scope, element, attrs, controller) {
      var chartTag = element[0];
      var myChart = echarts.init(chartTag);

      // 默认配置
      var option = {
        baseOption: {
          toolbox: {
            show: false, // 是否显示工具栏
            feature: {
              dataView: {
                readOnly: true // 数据只读
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false
          }
        }
      };

      // 刷新
      function refresh(){
        var allConfig = {};
        if($scope.config){
          angular.extend(allConfig, option, {baseOption: $scope.config});
          myChart.setOption(allConfig);
        }
      }

      // 监控数据变化
      $scope.$watch('config', function(){
        refresh();
      }, true);
    }
  };
});