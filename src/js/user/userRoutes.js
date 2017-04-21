/**
 * 应用路由-我的模块
 */
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		// 我的
		.state('my', {
			url: '/my',
			cache: false,
			templateUrl: 'user/views/my.html',
			controller: 'MyCtrl'
		})

		// 实名认证
		.state('certification',{
			url: '/certification',
			templateUrl: 'user/views/userinfo/my_certification.html',
			controller: 'CertificationCtrl'
		})

		// 用户信息
		.state("myBasicInfo", {
			url: '/my/basicInfo',
			params:{
				userId:null
			},
			templateUrl: 'user/views/userinfo/my_basic_info.html',
			controller: 'MyBasicInfoCtrl'
		})
		// 编辑用户信息
		.state("myBasicInfoEdit", {
			url: '/my/basicInfo/edit',
			params:{
				userId:null
			},
			templateUrl: 'user/views/userinfo/my_basic_info_edit.html',
			controller: 'MyBasicInfoEditCtrl'
		})

		// 我的家人
		.state('myFamily', {
			url: '/my/family',
			templateUrl: 'user/views/myfamily/my_family.html',
			controller: 'MyFamilyCtrl'
		})
		// 添加家人
		.state('myFamilyAdd',{
			url: 'my/family/add',
			templateUrl: 'user/views/myfamily/my_family_add.html',
			controller: 'MyFamilyAddCtrl'
		})

		// 我的档案
		.state('myArchive', {
			url: '/my/archive',
			templateUrl: 'user/views/userinfo/my_archives.html',
			controller: 'MyArchivesCtrl'
		})

		// 我的消息
		.state('myMessage', {
			url: '/my/message',
			templateUrl: 'user/views/mymessage/my_message.html',
			controller: 'MyMessageCtrl'
		})
		// 我的-我的消息详情
		.state('myMessageDetail', {
			url: '/my/message/:ID',
			params: {item: null},
			templateUrl: 'user/views/mymessage/my_message_detail.html',
			controller: 'MyMessageDetailCtrl'
		})

		// 我的留言
		.state('myLeaveMessage', {
			url: '/my/leavemessage',
			templateUrl: 'user/views/myleavemessage/my_leavemessage.html',
			controller: 'MyLeaveMessageCtrl'
		})
		// 我的留言-详情
		.state('myLeaveMessageDetail', {
			url: '/my/leavemessage/:ID',
			templateUrl: 'user/views/myleavemessage/my_leavemessage_detail.html',
			params: {item: null},
			controller: 'MyLeaveMessageDetailCtrl'
		})

		//我的收藏
		.state('myFav', {
			url: '/my/fav',
			templateUrl: 'user/views/myfav/my_fav.html'
		})

		// 修改密码
		.state('updatePwd', {
			url: '/updatePwd',
			templateUrl: 'user/views/password/update_pwd.html',
			controller: 'UpdatePwdCtrl'
		})
		// 找回密码-输入手机号
		.state('findPwdInputPhone', {
			url: '/findPwdInputPhone',
			templateUrl: 'user/views/password/find_pwd_inputphone.html',
			controller: 'FindPwdInputPhoneCtrl'
		})
		// 找回密码-重置密码
		.state('findPwdResetPwd', {
			url: '/findPwdResetPwd',
			params: {
				phone: null
			},
			templateUrl: 'user/views/password/find_pwd_resetpwd.html',
			controller: 'FindPwdResetPwdCtrl'
		})

		// 短信验证码登录-输入手机号
		.state('smsLoginInputPhone', {
			url: '/smsLoginInputPhone',
			templateUrl: 'user/views/login/login_sms_inputphone.html',
			controller: 'LoginSmsInputPhoneCtrl'
		})
		// 短信验证码登录-输入验证码登录
		.state('smsLogin', {
			url: '/smsLogin',
			params: {
				phone: null
			},
			templateUrl: 'user/views/login/login_sms.html',
			controller: 'LoginSmsCtrl'
		})
		;

});