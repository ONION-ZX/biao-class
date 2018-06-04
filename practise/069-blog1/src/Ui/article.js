let instance;

function init() {
  if(!instance)
    instance = new Article();

    return instance;
}

class Article {
    constructor(data) {
        this.el = document.querySelector('#article-list .list');
    }

    render(data) {
        this.el.innerHTML = '';
        data.forEach((row, index) => {
            let el_article = document.createElement('div');
            el_article.innerHTML = `
                <h3>${row.title}</h3>
                <div>${row.content}</div>
            `;
            this.el.appendChild(el_article);
        });
    }
}

init();

export default instance;