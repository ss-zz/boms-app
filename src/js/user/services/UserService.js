//用户
app.service('UserService', function(
	UTIL_HTTP,
	UTIL_USER,
	UTIL_DIALOG,
	$q,
	$rootScope,
	$ionicHistory,
	$sqliteService,
	$timeout){

	// 处理登录结果
	function handleLoginResult(params, data, deferred){
		if(data){
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache();
			$ionicHistory.removeBackView();

			// 将用户标识放入
			var userId = params.phoneNO;
			$rootScope.EXT.user.isLogin = true;
			$rootScope.EXT.user.id = userId;
			data.id = userId;

			UTIL_USER.setUserInfo(data)
				.then(function(){
					deferred.resolve(data);
				}, function(){
					deferred.reject();
				});
		}else{
			deferred.resolve(data);
		}
	};

	return {
		// 注册
		register: function(params){
			return UTIL_HTTP.post({
				url:"/users",
				data:params
			})
		},
		// 短信登录
		smsLogin: function(params){
			var deferred = $q.defer();
			UTIL_HTTP.get({
				url: "/login/sms",
				data: params
			})
			.then(function(data){
				handleLoginResult(params, data, deferred);
			});
			return deferred.promise;
		},
		//登录
		login : function(params){
			var deferred = $q.defer();
			UTIL_HTTP.get({
				url: "/login",
				data: params
			})
			.then(function(data){
				handleLoginResult(params, data, deferred);
			});
			return deferred.promise;
		},
		//登录-测试静态登录
		loginDemo : function(params){
			var deferred = $q.defer();

			$timeout(function(){
				var params = {phoneNO: 13603111111};
				var data = {
					GENDER: '01',
					USER_NAME: '测试用户',
					BIRTHDAY: '1990-03-20',
					HEALTHRECORD_NO: '121212121212121212',
					PHONE_NO: '13603878787',
					DOMICILE_ADDRESS: '河南郑州',
					CURRENT_ADDRESS: '河南郑州金水',
					IMG_PATH: '0001',
					slowDisRemind: [],
					USER_TYPE: '01',
					pregnantRemind: {},
					AUTHEN_STATE: '02',
					AUTHEN_DESC: '证件不合法'
				};
				handleLoginResult(params, data, deferred);
			}, 100);

			return deferred.promise;
		},
		//登出
		logout : function(){
			var deferred = $q.defer();
			UTIL_HTTP.delete({
				url: "/login"
			}).then(function(data){
				$rootScope.EXT.user.isLogin = false;
				$rootScope.EXT.user.id = null;
				UTIL_USER.logout();
				deferred.resolve();
			});
			return deferred.promise;
		},
		// 设置密码
		updatePwd: function(params){
			return UTIL_HTTP.patch({
				url: "/users",
				data: params
			})
		},
		// 修改密码
		changePwd: function(params){
			return UTIL_HTTP.patch({
				url: "/users/changePassword",
				data: params
			})
		},
		// 获取登录用户基本信息-本地
		getLocalBaseInfo: function(){
			var deferred = $q.defer();
			UTIL_USER.getUser().then(function(userInfo){
				deferred.resolve(userInfo ? userInfo.userInfoMap : null);
			});
			return deferred.promise;
		},
		// 更新登录用户基本信息-本地
		updateLocalBaseInfo: function(userInfoMap){
			var deferred = $q.defer();
			UTIL_USER.getUser().then(function(userInfo){
				if(userInfo){
					userInfo.userInfoMap = userInfoMap;
					UTIL_USER.setUserInfo(userInfo)
						.then(function(){
							deferred.resolve();
						}, function(){
							deferred.reject();
						});
				}else{
					deferred.resolve();
				}
			});
			return deferred.promise;
		},
		// 发送手机短信验证码
		sendSms: function(params){
			return UTIL_HTTP.post({
				url:"/sms",
				data: params
			})
		},
		// 修改用户基本信息
		updateUserInfo: function(params){
			return UTIL_HTTP.patch({
				url:"/users",
				data: params
			})
		},
		// 验证手机号
		validPhone: function(phone){
			if (!phone) {
				UTIL_DIALOG.show("请输入您的手机号");
				return false;
			}
			if(!(/^\d{11}$/.test(phone))) {
				UTIL_DIALOG.show("手机号码格式错误");
				return false;
			}
			return true;
		},
		// 获取用户消息
		getUserMessage: function(params){
			return UTIL_HTTP.get({
				url:"/users/messages",
				data: params
			})
		},
		// 获取用户留言
		getUserLeaveMessage: function(params){
			return UTIL_HTTP.get({
				url:"/users/leaveMessages",
				data: params
			});
		},
		// 修改消息状态
		setMessageReaded: function(msgId){
			return UTIL_HTTP.patch({
				url: "/users/messages/" + msgId,
				isShowLoading: false
			});
		},
		// 上传图片
		uploadImg: function(base64Img){
			return UTIL_HTTP.post({
				url:"/img",
				data: {img: base64Img}
			});
		}

	};

})