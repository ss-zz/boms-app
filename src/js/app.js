// app启动文件
var app = angular.module('app',
	['ionic',
	'ionic-datepicker',
	'ionic-timepicker',
	'ngCordova',
	'app.routes',
	'as.sortable',
	'templates'
	], function($httpProvider){

})

.run(function(
		$state,
		$rootScope,
		$sqliteService,
		$ionicPlatform,
		$ionicHistory,
		$cordovaToast,
		$cordovaKeyboard,
		UTIL_USER,
		APPCONFIG,
		BackgroundModeService,
		SoftwareUpdateService
		) {

	// 记录用户登录状态
	$rootScope.EXT = {
		user: {
			isLogin: null,
			id: null
		}
	};
	// 平台准备完成
	$ionicPlatform.ready(function() {

		// cordova插件配置
		if (window.cordova && window.cordova.plugins) {

			// 键盘配置
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			// 滚动配置
			cordova.plugins.Keyboard.disableScroll(true);

			// 覆盖默认打开外部页面的方式-InAppBrowser插件
			window.open = cordova.InAppBrowser.open;
			// 启动后台模式
			BackgroundModeService.run();

		}

		// 状态条配置
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		// 初始化数据库
		$sqliteService.db();
		// 检测新版本
		SoftwareUpdateService.detectVersion();
		// 启动画面配置
		if(navigator.splashscreen){
			navigator.splashscreen.hide();
		}
		// 后退按钮事件重新定义
		$ionicPlatform.registerBackButtonAction(function (e) {

			// 隐藏键盘
			if ($cordovaKeyboard.isVisible()) {
					$cordovaKeyboard.close();
			}
			// 返回上一页
			else if ($ionicHistory.backView()) {
					$ionicHistory.goBack();
			}
			// 退出应用
			else if ($rootScope.backButtonPressedOnceToExit) {
					ionic.Platform.exitApp();
			}
			// 再按一次退出
			else{
				$rootScope.backButtonPressedOnceToExit = true;
				$cordovaToast.showShortTop('再按一次退出系统');
				setTimeout(function () {
					$rootScope.backButtonPressedOnceToExit = false;
				}, 4000);
			}

			e.preventDefault();
			return false;
		}, 101);

		// 初始化用户登录状态
		if(!APPCONFIG.IS_WEB){
			UTIL_USER.getUserId().then(function(userId){
				var isLogin = userId ? true : false;
				$rootScope.EXT.user.isLogin = isLogin;
				$rootScope.EXT.user.id = userId;

				// 需要登录的页面
				var needLoginStates = [
					// 互动大厅-在线留言
					'leavemessage',

					// 孕产妇管理
					'leavemessage',
					'womanstatechange',
					'prenatal_exam',
					'prenatal_exam_alert',

					// 系统
					'systemFeedback'

				];
				//监听页面切换-开始-判断页面是否需要登录
				$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
					var toStateName = toState.name;
					var isNeedLogin = false;
					// 过滤需要登录的页面
					for(var idx in needLoginStates){
						if(toStateName == needLoginStates[idx]){
							isNeedLogin = true;
							break;;
						}
					}

					if(isNeedLogin){// 需要登录
						// 是否已登录
						var isLogin = $rootScope.EXT.user.isLogin;
						if(!isLogin){
							e.preventDefault();
							$state.go(//跳转到登录界面
								"login",
								{from: fromState.name,
								fromParams: fromParams,
								to: toState.name,
								toParams: toParams});
						}
					}

				});

			});
		}

	});

});

//自定义ionic配置
app.config(function(
	$ionicConfigProvider,
	$urlRouterProvider,

	ionicDatePickerProvider,
	ionicTimePickerProvider,

	APPCONFIG
	) {

	//tabs位置
	$ionicConfigProvider.tabs.position("bottom");
	//js滚动
	// $ionicConfigProvider.scrolling.jsScrolling(true);
	// 禁用侧滑返回
	$ionicConfigProvider.views.swipeBackEnabled(false);

	// 自定义日期选择控件
	var datePickerObj = {
		inputDate: new Date(),
		titleLabel: '选择日期',
		setLabel: '确认',
		todayLabel: '今天',
		closeLabel: '取消',
		setButtonType: 'button-assertive',
		todayButtonType: 'button-assertive',
		closeButtonType: 'button-assertive',
		modalHeaderColor: 'bar-positive',
		modalFooterColor: 'bar-positive',
		mondayFirst: false,
		weeksList: ["日", "一", "二", "三", "四", "五", "六"],
		monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		templateType: 'modal',
		showTodayButton: true,
		dateFormat: 'yyyy-MM-dd',
		closeOnSelect: false
	};
	ionicDatePickerProvider.configDatePicker(datePickerObj);

	// 自定义时间选择控件
	var timePickerObj = {
		inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
		format: 24,
		step: 1,
		setLabel: '确认',
		closeLabel: '取消'
	};
	ionicTimePickerProvider.configTimePicker(timePickerObj);

});

// 导航标签控制器
app.controller("NavBarCtrl", function($scope, $state ,$ionicHistory) {
	$scope.getPreviousTitle = function() {
		return $ionicHistory.backTitle();
	};
});

// 其它控制器
app.controller("OtherCtrl", function($scope, $state, fromStateServ) {
	$scope.backNav = function() {
		var fromState = fromStateServ.getState("other");
		if (fromState.fromState !== undefined) {
			$state.go(fromState.fromState.name, fromState.fromParams);
		} else {
			//设置没有历史的时候，默认的跳转
			$state.go("homepage");
		}
	};
});

// 菜单标签切换
app.controller("TabsCtrl", function($scope, $state, $ionicHistory) {
	$scope.selectTabWithIndex = function(index, targetState) {
		$state.go(targetState);
		//切换主菜单、清除历史记录
		$ionicHistory.clearHistory();
	}
});
