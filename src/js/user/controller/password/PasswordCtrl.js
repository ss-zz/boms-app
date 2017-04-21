//设置密码
app.controller('PasswordCtrl', function($scope, $state ,$stateParams,$http,UTIL_DIALOG,UserService, $ionicHistory) {
	var username=$stateParams.username;
	$scope.setPassword=function(password){
		UserService.password({"phoneNO":username,"password":password}).then(function(data){
			if(data.errorcode=="201"){
				UTIL_DIALOG.show("data.msg" || "加载失败");
			}else if(data.errorcode=="200"){
				$state.go("login");
			}
		})
	}
})
