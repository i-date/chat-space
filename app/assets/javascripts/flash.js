$(function(){
  var notification = $(".notification");
  var notificationHeight;
  if (notification.length) {
    notificationHeight = notification.outerHeight();
    setTimeout(function () {
      notification.animate({
        'top': -notificationHeight
      }, 300);
    }, 5000);
  }
})
