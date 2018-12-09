$(function () {
  function buildHTML(message) {
    var html = `<li class="chat__body__list">
                  <span class="chat__body__list__user-name">${ message.user_name }</span>
                  <span class="chat__body__list__creation-time">${ message.created_at }</span>
                  <div class="chat__body__list__message">`
                    + `<div class="chat__body__list__message__body">${message.body}</div>`
                    + `${message.image_url ? `<img src="${message.image_url}">` : ``}`
                  + `</div>
                </li>`
    return html;
  }

  function buildGroupNewMessage(newMessage) {
    var groupNewMessage;
    if (newMessage.length == 0) {
      return groupNewMessage = "画像が投稿されています";
    } else {
      return groupNewMessage = newMessage;
    }
  }

  $("#message-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url      = $(this).attr("action");
    $.ajax({
      url        : url,
      type       : "POST",
      data       : formData,
      dataType   : 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      var groupNewMessage = buildGroupNewMessage(data.body);
      $("#group__" + data.group_id + "> .chat-nav__group__list__new-message").html(groupNewMessage);
      $(".chat__body").append(html);
      $(".chat__body").animate({
        scrollTop: $(".chat__body")[0].scrollHeight
      }, "fast");
    })
    .fail(function () {
      alert('error');
    })
    .always(function () {
      $(".chat__footer__submit").removeAttr("disabled");
      $("#message-form")[0].reset();
    });
  })
})
