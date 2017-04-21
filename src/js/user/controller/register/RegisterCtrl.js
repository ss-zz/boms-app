// 注册
app.controller('RegisterCtrl', function($scope, $state, UserService, $cordovaDevice, UTIL_DIALOG, $ionicHistory, $interval) {

	// 设备唯一号
	var uuid = null;
	// sim序列号（android可用）
	var simSerialNumber = null;
	document.addEventListener("deviceready", function () {
		if (window.plugins){
			uuid = $cordovaDevice.getUUID();
			if(window.plugins.sim){
				window.plugins.sim.getSimInfo(function(info){
					simSerialNumber = info ? info.simSerialNumber : null;
				});
			}
		}
	}, false);

	// 注册对象
	$scope.params = {
		IMEINO: uuid,
		SIMNO: simSerialNumber
	};

	// 发送验证码
	$scope.sendSms = function(){
		if (!UserService.validPhone($scope.params.phoneNO)) {
			return;
		}
		beginSmsCountDown();
		UserService.sendSms({
			phoneNO: $scope.params.phoneNO,
			isShowLoading: false
		});
	};
	// 短信倒计时
	var countSms = 60;
	function beginSmsCountDown(){
		$scope.isCountDown = true;
		$scope.countDown = countSms;
		$interval(function(){
			$scope.countDown--;
			if($scope.countDown == 0){
				$scope.isCountDown = false;
			}
		}, 1000, countSms);
	}

	// 注册
	$scope.register = function() {
		if (!UserService.validPhone($scope.params.phoneNO)) {
			return;
		}
		if(!$scope.params.verifyNO) {
			UTIL_DIALOG.show("请输入验证码");
			return;
		}
		if(!$scope.params.password) {
			UTIL_DIALOG.show("请输入密码");
			return;
		}

		// 注册
		UserService.register($scope.params).then(function (data) {
			UTIL_DIALOG.show("注册成功");
			// 登录
			UserService.login({
				phoneNO: $scope.params.phoneNO,
				password: $scope.params.password
			}).then(function(){
				$ionicHistory.clearHistory();
				$state.go("homepage");
			});
		});
	};

})
