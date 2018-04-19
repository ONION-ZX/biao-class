var modal_trigger = document.querySelector('.modal-trigger');
var modal_content = document.querySelector('.modal');
var a = document.querySelector('a');

a.addEventListener('click',function(e) {
  e.preventDefault();
});

function visible() {
 return modal_content.classList.contains('show');
}

function show() {
  modal_content.classList.add('show');
}

function hide() {
  modal_content.classList.remove('show');
}

modal_trigger.addEventListener('click',function() {
  visible() ? hide() : show();
});
