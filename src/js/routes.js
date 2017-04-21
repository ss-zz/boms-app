/**
 * 应用路由
 */
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		//登录页
		.state('login', {
			url: '/login',
			params: {
				from: null,
				fromParams: null,
				to: null,
				toParams: null
			},
			templateUrl: 'user/views/login/login.html',
			controller: 'LoginCtrl'
		})
		// 注册页
		.state('register', {
			url: '/register',
			templateUrl: 'user/views/register/register.html',
			controller: 'RegisterCtrl'
		})
		.state("other", {
			url: "/other",
			abstract: true,
			controller: "OtherCtrl",
			template: "<ion-nav-view></ion-nav-view>",
			onEnter: function($rootScope, fromStateServ) {
				fromStateServ.setState(
					"other",
					$rootScope.fromState,
					$rootScope.fromParams);
			}
		});

	$urlRouterProvider
		.otherwise('homepage');

});