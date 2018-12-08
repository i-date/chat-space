$(function(){
  $("#message-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
  })
})
