$(function() {
  var search_field = $("#user-search-field");
  var search_result = $("#user-search-result");
  var group_member = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_result.append(html);
  }

  function appendNoUser(notice) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ notice }</p>
                </div>`
    search_result.append(html);
  }

  function appendMember(member) {
    var html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ member.id }">
                  <input name='group[user_ids][]' type='hidden' value='${ member.id }'>
                  <p class='chat-group-user__name'>${ member.name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_member.append(html);
  }

  search_field.on("keyup", function() {
    var input_name = search_field.val();

    if (input_name.length) {
      $.ajax({
        url: '/users',
        type: "GET",
        data: { members: input_name },
        dataType: 'json'
      })
      .done(function (users) {
        search_result.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function () {
        alert('ユーザー検索に失敗しました');
      })
    } else {
      search_result.empty();
    }
  })

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function () {
    var member = {};
    member.id = $(this).attr("data-user-id");
    member.name = $(this).attr("data-user-name");
    $(this).parent().remove();
    appendMember(member);
  })

  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function () {
    $(this).parent().remove();
  })
})
