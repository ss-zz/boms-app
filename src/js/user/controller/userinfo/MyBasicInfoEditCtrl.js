// 个人基本信息修改
app.controller('MyBasicInfoEditCtrl',
	function(
	$scope,
	$state,
	$filter,
	UserService,
	UTIL_DIALOG,
	DicService,
	ionicDatePicker,
	$ionicActionSheet,
	$cordovaCamera) {

	// 用户信息
	$scope.updateInfo = {
		GENDER: '01'
	};

	// 性别字典
	$scope.genderDics = DicService.getDicsByType("GENDER");

	// 页面进入之前刷新数据
	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.refresh();
	});

	// 刷新
	$scope.refresh = function(){
		// 获取个人信息
		UserService.getLocalBaseInfo()
		.then(function(data){
			$scope.imageData = null;
			if(data){
				$scope.updateInfo = data;
			}
		});
	}

	// 修改用户的基本信息
	$scope.update = function() {

		// 校验
		if(valid()){

			// 先上传头像
			UserService.uploadImg($scope.imageData)
				.then(function(id){
					$scope.updateInfo.IMG_PATH = id;

					// 修改用户信息
					var updateInfo = $scope.updateInfo;
					UserService.updateUserInfo({
						Gender: updateInfo.GENDER,
						realName: updateInfo.USER_NAME,
						birthday: updateInfo.BIRTHDAY,
						healthrecordNo: updateInfo.HEALTHRECORD_NO,
						phoneNo: updateInfo.PHONE_NO,
						domicileAddress: updateInfo.DOMICILE_ADDRESS,
						currentAddress: updateInfo.CURRENT_ADDRESS,
						imgPath: updateInfo.IMG_PATH
					}).then(function(){
						// 更新本地信息
						UserService.updateLocalBaseInfo(updateInfo)
						.then(function() {
							//修改信息成功提示
							UTIL_DIALOG.show("修改成功");
						});
					})

				});
		}

	};

	// 选择出生日期
	$scope.openDatePicker = function() {
		ionicDatePicker.openDatePicker({
				callback: function(val) {
					$scope.updateInfo.BIRTHDAY = $filter('date')(val, 'yyyy-MM-dd');
				}
			});
	};

	// 选择头像
	$scope.selectImg = function() {
		var hideSheet = $ionicActionSheet.show({
			buttons: [{
				text: '相册'
			}, {
				text: '拍照'
			}],
			titleText: '选择图片',
			cancelText: '取消',
			cancel: function() {

			},
			buttonClicked: function(index) {

				// 配置
				var cameraConfig = {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 200,
					targetHeight: 200,
					mediaType: 0,
					cameraDirection: 1,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false
				};

				if(index == 0){// 相册
					cameraConfig.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
				}else if(index == 1){// 拍照
					cameraConfig.sourceType = Camera.PictureSourceType.CAMERA;
				}

				// 选择头像
				$cordovaCamera.getPicture(cameraConfig)
					.then(function(imageData) {
						$scope.imageData = imageData;
					}, function(err) {
						UTIL_DIALOG.show("选择图片失败");
					});

			}
		});
	};

	// 校验
	function valid(){

		var updateInfo = $scope.updateInfo;

		if(!updateInfo.USER_NAME){
			UTIL_DIALOG.show("姓名不能为空");
			return false;
		}
		if(updateInfo.USER_NAME.length < 2 || updateInfo.USER_NAME.length > 10){
			UTIL_DIALOG.show("姓名长度为2到10个字符");
			return false;
		}
		if(!updateInfo.BIRTHDAY){
			UTIL_DIALOG.show("出生日期不能为空");
			return false;
		}
		if(updateInfo.HEALTHRECORD_NO !== undefined && updateInfo.HEALTHRECORD_NO.length != 18){
			UTIL_DIALOG.show("请输入18位的健康档案号");
			return false;
		}
		if(!UserService.validPhone(updateInfo.PHONE_NO)){
			UTIL_DIALOG.show("手机号码格式错误");
			return false;
		}
		if(updateInfo.DOMICILE_ADDRESS && updateInfo.DOMICILE_ADDRESS.length > 80){
			UTIL_DIALOG.show("户籍地址最多80个字符");
			return false;
		}
		if(updateInfo.CURRENT_ADDRESS && updateInfo.CURRENT_ADDRESS.length > 80){
			UTIL_DIALOG.show("联系地址最多80个字符");
			return false;
		}

		return true;
	}

});