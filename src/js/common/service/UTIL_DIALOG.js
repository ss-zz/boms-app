// 消息提醒
app.factory('UTIL_DIALOG', function($ionicPopup, $cordovaToast){

  function showMessage (message, duration, position){
    if(!message) return;
      if(window.cordova){
        duration = !duration ? "long" : duration;
        position = !position ? "top" : position;
        $cordovaToast.show(message, duration, position)
      }else{
        $ionicPopup.alert({
          buttons: [{
            text: '确认',
            type: 'button-balanced'
          }],
          template: message
        });
      }
  }

  return {
    // 显示消息-默认为 long, top
    show: function(message, duration, position){
      showMessage(message, duration, position);
    },
    //显示消息
    alert: function(message){
      showMessage(message);
    }
  };
});