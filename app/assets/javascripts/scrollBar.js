$(function(){
  if ($(".chat__body > li").length) {
    var scrollStop;
    $(".chat__body").on("scroll", function(){
      $(".chat__body").removeClass("hide-scrollbar");
      $(".chat__body").addClass("scrollbar");

      clearTimeout(scrollStop);

      scrollStop = setTimeout(function () {
        $(".chat__body").removeClass("scrollbar");
        $(".chat__body").addClass("hide-scrollbar");
      }, 500);
    })
  }
})
