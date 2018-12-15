$(window).load(function () {
  if ($(".chat__body > li").length) {
    var positionBottom = $(".chat__body > li:last-child").position().top;
    $(".chat__body").scrollTop(positionBottom);
  }
})
