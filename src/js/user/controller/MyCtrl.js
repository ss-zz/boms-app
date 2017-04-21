//我的-首页
app.controller('MyCtrl', function(
	$scope,
	$state,
	UTIL_USER,
	UTIL_DIALOG,
	$ionicHistory,
	$cordovaCamera
	) {

	// 首页tab清除历史
	$ionicHistory.clearHistory();

	// 页面进入之前刷新数据
	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.refresh();
	});

	// 默认头像
	var defaultHeadIcon = "img/my/u1690.png";

	// 刷新页面数据
	$scope.refresh = function(){

		$scope.$broadcast('scroll.refreshComplete');

		// 登录状态
		UTIL_USER.isLogin().then(function(isLogin){
			$scope.isLogin = isLogin;

			if(isLogin){
				// 获取个人信息
				UTIL_USER.getUser()
				.then(function(data){
					var userInfo = data ? data.userInfoMap : null;
					if(userInfo){
						$scope.userInfo = userInfo;

						// 头像
						$scope.imgId = userInfo.IMG_PATH;

					}
				});
			}else{
				$scope.imgHead = defaultHeadIcon;
			}
		});
	};

	// 点击头像
	$scope.clickHeadIcon = function(){
		if($scope.isLogin){// 已登录

			if(!Camera){
				return;
			}

			var cameraConfig = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
				allowEdit: true,
				encodingType:Camera.EncodingType.JPEG,
				targetWidth: 200,
				targetHeight: 200,
				mediaType: 0,
				cameraDirection: 1,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			// 选择头像
			$cordovaCamera.getPicture(cameraConfig)
				.then(function(imageData) {
					$scope.imgHead = "data:image/jpeg;base64," + imageData;
					//TODO 上传保存头像
			}, function(err) {
					UTIL_DIALOG.show("选择图片失败");
			});

		}else{// 未登录
			// 登录
			$state.go('login');
		}
	};

});