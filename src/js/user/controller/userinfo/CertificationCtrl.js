// 实名认证
app.controller('CertificationCtrl', function($scope, $state, $stateParams, $ionicActionSheet) {
	//证件拍照
	function takePhoto() {
		var options = {
			quality: 100,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 200,
			targetHeight: 200,
			mediaType: 0,
			cameraDirection: 0,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			CommonJs.AlertPopup(imageData);
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
		}, function(err) {
			// error
			CommonJs.AlertPopup(err.message);
		});
	}

	//选择图片
	function photo() {
		var cameraConfig = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
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
	}

	//选择获取图片的 方式
	$scope.selectPicture = function() {
		$ionicActionSheet.show({
			buttons: [{
				text: '<span class="color-blue">相册</span>'
			}, {
				text: '<span class="color-blue">拍照</span>'
			}, ],
			cancelText: '取消',
			buttonClicked: function(index) {
				if (index == 0) { // 相册
					photo();
				} else if (index == 1) { // 拍照
					takePhoto();
				}
				return true;
			}
		});
	}

	//提交认证信息
	$scope.certificationParams = {};
	$scope.certification = function() {

	};

});