$(function () {
  var groupId;
  var groupUrl;
  var latestMessage;
  var latestMessageBody;
  var messageContent;
  var latestMessageId;
  var intervalChangeFlag = [];
  intervalChangeFlag.push(setIntervalMessage = setInterval(reloadMessages, 5000));

  function buildHTML(message) {
    var messageBody = message.body ? message.body : "";
    var messegeImage = message.image_url ? `<img src="${ message.image_url }">` : ``;
    var html = `<li class="chat__body__list" id="message__${ message.message_id }">
                  <span class="chat__body__list__user-name">${ message.user_name }</span>
                  <span class="chat__body__list__creation-time">${ message.created_at }</span>
                  <div class="chat__body__list__message">
                    <div class="chat__body__list__message__body">${ messageBody }</div>
                    ${ messegeImage }
                  </div>
                </li>`
    return html;
  }

  $("#message-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function (newMessage) {
      // サイドメニュー（グループ）の最新メッセージ更新
      var groupNewMessage = newMessage.body.length ? newMessage.body : "画像が投稿されています";
      $("#group__" + newMessage.group_id + "> .chat-nav__group__list__new-message").html(groupNewMessage);
      // 新規投稿メッセージ・イメージの追加
      var html = buildHTML(newMessage);
      $(".chat__body").append(html);
      $(".chat__body").animate({ scrollTop: $(".chat__body")[0].scrollHeight }, "fast");
    })

    .fail(function () {
      alert("error");
    })

    .always(function () {
      $(".chat__footer__submit").removeAttr("disabled");
      $("#message-form")[0].reset();
    });
  })

  function reloadMessages() {
    groupUrl = $(location).attr("href").match(/\/groups\/\d+\/messages/);
    if (groupUrl !== null) {
      groupId = groupUrl[0].match(/\d+/);
      latestMessageId = $(".chat__body > li").length ? $(".chat__body > li:last-child").attr("id").replace(/message__/, "") : "";

      $.ajax({
        url: groupUrl[0],
        type: "GET",
        data: {
          group_id         : groupId[0],
          latest_message_id: latestMessageId
        },
        dataType: "json"
      })

      .done(function (messages) {
        if (messages.length) {
          // サイドメニュー（グループ）の最新メッセージ更新
          latestMessageBody = messages[messages.length - 1].body;
          latestMessage = latestMessageBody.length ? latestMessageBody : "画像が投稿されています";
          $("#group__" + groupId[0] + "> .chat-nav__group__list__new-message").html(latestMessage);

          // 最新メッセージ・イメージの追加
          messages.forEach(function (message) {
            messageContent = buildHTML(message);
            $(".chat__body").append(messageContent);
          });
          $(".chat__body").animate({ scrollTop: $(".chat__body")[0].scrollHeight }, "fast");
        }
      })

      .fail(function () {
        clearInterval(intervalChangeFlag.shift());
        alert("メッセージの自動更新ができませんでした");
      })
    }
  }
})
