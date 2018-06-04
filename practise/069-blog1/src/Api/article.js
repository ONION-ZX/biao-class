import send from '../Util/send';

let instance;

function init() {
  if(!instance)
    instance = new Article();
  return instance;
}

class Article {
  read(page, on_succeed, on_fail) {
    send.get('/api/article/read',on_succeed, on_fail);
  }
}

init();

export default instance;
