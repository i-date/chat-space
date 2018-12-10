$(window).load(function () {
  var chatBody = $(".chat__body");
  if (chatBody.length) {
    $(".chat__body").animate({
      scrollTop: $(".chat__body")[0].scrollHeight
    }, 0);
  }
})
