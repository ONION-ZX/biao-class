var form = document.getElementById('search-form')
  , input = document.getElementById('search-input')
  , user_list = document.getElementById('user-list')
  , next = document.getElementById('next')
  , top = document.getElementById('top')
;

function hide_next() {
  next.hidden = true;
}

function show_next() {
  next.hidden = false;
}

function render_user_list(data) {
  var html = user_list.innerHTML;
  data.forEach(function(user) {
    html = html +　`
      <div class="user">
        <a class="avatar" target = "_blank" href = "${user.html_url}"}>
          <img src = "${user.avatar_url}">
        </a>
        <div class="info">
          <div class="username">${user.login}</div>
          <div><a target = "_blank" href = "${user.html_url}">${user.html_url}</a></div>
        </div>
      </div>
    `;
  });
  user_list.innerHTML = html;
}

module.exports = {
  show_next: show_next,
  hide_next: hide_next,
  form: form,
  input: input,
  next: next,
  top: top,
  render_user_list: render_user_list,
}
