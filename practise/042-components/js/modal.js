var modal_trigger = document.querySelector('.modal-trigger');
var modal_content = document.querySelector('.modal');
var modal_close = document.querySelector('.close')
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

// modal_close.addEventListener('click',hide);
document.addEventListener('click',function(e) {
  var el = e.target;
  var menu = el.closest('.modal');
  if(!menu && el !== modal_close)
    return;
  hide();
});

document.addEventListener('keyup',function(e) {
  if(e.code !== 'Escape')
    return;
  hide();
})
