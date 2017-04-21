/**
 * 应用路由-系统、应用公共
 */
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // 用户协议
    .state('systemUseragreement', {
      url: '/system/useragreement',
      templateUrl: 'system/views/useragreement.html'
    })

    // 帮助手册
    .state('systemHelps', {
      url: '/system/helps',
      templateUrl: 'system/views/helps.html'
    })

    // 软件设置
    .state('systemSoftset', {
      url: '/system/softset',
      templateUrl: 'system/views/softset.html',
      controller: 'SystemSoftsetCtrl'
    })
    // 软件设置-关于我们
    .state('systemSoftsetAboutus', {
      url: '/system/softset/aboutus',
      templateUrl: 'system/views/aboutus.html'
    })

    // 意见反馈
    .state('systemFeedback', {
      url: '/system/feedback',
      templateUrl: 'system/views/feedback.html',
      controller: 'FeedBackCtrl'
    })

});
