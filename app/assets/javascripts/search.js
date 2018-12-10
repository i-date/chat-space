$(function() {
  var search_field = $("#user-search-field");
  var search_result = $("#user-search-result");
  var name_length = 0;

  function appendMember(member) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ member.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ member.id }" data-user-name="${ member.name }">追加</a>
                </div>`
    search_result.append(html);
  }

  function appendNoMember(notice) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ notice }</p>
                </div>`
    search_result.append(html);
  }

  search_field.on("keyup", function() {
    var input_name = search_field.val();

    if (input_name.length) {
      if (input_name.length !== name_length) {
        $.ajax({
          url: '/users',
          type: "GET",
          data: { members: input_name },
          dataType: 'json'
        })
        .done(function (users) {
          search_result.empty();
          if (users.length !== 0) {
            users.forEach(function (member) {
              appendMember(member);
            });
          }
          else {
            appendNoMember("一致するユーザーはいません");
          }
        })
        .fail(function () {
          alert('ユーザー検索に失敗しました');
        })
      }
    } else {
      search_result.empty();
    }
    name_length = input_name.length;
  })
})
