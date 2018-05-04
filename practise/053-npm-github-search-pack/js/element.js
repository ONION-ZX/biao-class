/*UI元素相关*/

/*选中页面中要用到的元素*/
var form = document.getElementById('search-form')
  , input = document.getElementById('search-input')
  , next = document.getElementById('next')
  , user_list = document.getElementById('user-list')
  , top = document.getElementById('top')
  , http = new XMLHttpRequest()
;

/*渲染用户列表
* @param Array data 用于渲染的数据
* */
function render_user_list(data) {
  var html = user_list.innerHTML;

  data.forEach(function (user) {
    html = html + `
  <div class="user">
    <a class="avatar" target="_blank" href="${user.html_url}">
      <img src="${user.avatar_url}">
    </a>
    <div class="info">
      <div class="username">${user.login}</div>
      <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
    </div>
  </div>
    `;

    user_list.innerHTML = html;
  });
}



function hide_next() {
  next.hidden = true;
}

function show_next() {
  next.hidden = true;
}

module.exports = {
  form: form,
  input: input,
  next: next,
  top: top,
  show_next: show_next,
  hide_next: hide_next,
  render_user_list: render_user_list,
  http: http,
}
// var form = document.getElementById('search-form')
//   , input = document.getElementById('search-input')
//   , next = document.getElementById('next')
//   , user_list = document.getElementById('user-list')
// ;
//
// function render_user_list(data) {
//   var html = user_list.innerHTML;
//
//   data.forEach(function(user) {
//     html = html + `
//       <div class="user">
//         <a class="avatar" target="_blank" href="${user.html_url}">
//           <img src="${user.avatar_url}">
//         </a>
//         <div class="info">
//           <div class="username">${user.login}</div>
//           <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
//         </div>
//       </div>
//     `;
//
//     user_list.innerHTML = html;
//   });
// }
// function hide_next() {
//   next.hidden = true;
// }
//
// function show_next() {
//   next.hidden = false;
// }
//
// module.exports = {
//   form: form,
//   input: input,
//   next: next,
//   show_next: show_next,
//   hide_next: hide_next,
//   render_user_list: render_user_list,
// }

// /*UI元素相关*/
//
// /*选中页面中要用到的元素*/
// var form = document.getElementById('search-form')
//   , input = document.getElementById('search-input')
//   , next = document.getElementById('next')
//   , user_list = document.getElementById('user-list')
// ;
//
// /*渲染用户列表
// * @param Array data 用于渲染的数据
// * */
// function render_user_list(data) {
//   var html = user_list.innerHTML;
//
//   data.forEach(function (user) {
//     html = html + `
//   <div class="user">
//     <a class="avatar" target="_blank" href="${user.html_url}">
//       <img src="${user.avatar_url}">
//     </a>
//     <div class="info">
//       <div class="username">${user.login}</div>
//       <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
//     </div>
//   </div>
//     `;
//
//     user_list.innerHTML = html;
//   });
// }
//
// function hide_next() {
//   next.hidden = true;
// }
//
// function show_next() {
//   next.hidden = true;
// }
//
// module.exports = {
//   form: form,
//   input: input,
//   next: next,
//   show_next: show_next,
//   hide_next: hide_next,
//   render_user_list: render_user_list,
// }
