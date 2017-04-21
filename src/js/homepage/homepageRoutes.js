/**
 * 应用路由-homepage
 */
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        // 首页
        .state('homepage', {
            url: '/homepage',
            templateUrl: 'homepage/views/home_view.html',
            controller: 'homeviewCtrl'
        })
        // 智能导诊-部位选择
        .state('diagnosis_select', {
            url: '/diagnosis_select',
            templateUrl: 'homepage/views/disease_diagnosis.html',
            controller: 'DiagnosisCtrl'
        })
        // 智能导诊-结果
        .state('disease_diagnosis_result', {
            url: '/disease_diagnosis_result',
            templateUrl: 'homepage/views/disease_diagnosis_result.html'
        })
        // 更多服务
        .state('service', {
            url: '/service',
            templateUrl: 'homepage/views/home_service.html',
            controller: 'HomeServiceCtrl'
        })
        //健康资讯  Health information
        .state('health_information', {
            url: '/health_information',
            templateUrl: 'homepage/views/health_information.html',
            controller: 'HealthInfoCtrl'
        })
        //资讯详情 healthinfo_degtail
        .state('healthinfo_degtail', {
            url: '/healthinfo_degtail',
            templateUrl: 'homepage/views/healthinfo_degtail.html',
            controller: 'HealthInfoCtrl'
        })
    ;

});