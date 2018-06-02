import send from '../Util/send';

let instance;

function init() {
  if(!instance)
    instance = new Article();
  return instance;
}

class Article {
  read(page) {
    send.get('/api/article/read', data => {
      console.log(data);
    });
  }
}

init();

export default instance;
