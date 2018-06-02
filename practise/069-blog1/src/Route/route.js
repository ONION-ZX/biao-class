let instance;

class Route {
  constructor() {
    this.current = this.parse_hash(window.location.hash) || 'home';
    this.page_list = document.querySelectorAll('.page');
    this.detect_click();
    this.detect_hash_change();
    this.render();
  }

  detect_hash_change() {
    window.addEventListener('hashchange', () => {
      this.go(window.location.hash);
    });
  }

  detect_click() {
    document.addEventListener('click',e => {
      let target = e.target;
      switch (target.nodeName) {
        case 'A':
          if(target.host)
            return;

          this.go(target.href);
          break;
      }
    });
  }

  go(hash) {
    let old_state = this.current;
    let new_state = this.parse_hash(hash);

    if(old_state === new_state)
      return;

    this.current = new_state;
    this.render();
  }

  parse_hash(hash) {
    let hash_arr = hash.split('/');
    return hash_arr[hash_arr.length - 1];
  }

  render(page) {
    let content;
    page = page || this.current;
    this.hide_all();
    content = document.getElementById(page);
    content.hidden = false;
  }

  hide_all() {
    this.page_list.forEach(page => {
      page.hidden = true;
    });
  }

}

const init = () => {
  if(!instance)
    instance = new Route();
}

export default {
  init,
}
