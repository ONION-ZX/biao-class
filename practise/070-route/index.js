let app_data = {
    article: {
        list: [
            {
                id: 1,
                title: 'ABC',
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa dicta dolorem doloribus eveniet fuga, illum iste labore modi neque nisi, nostrum odit placeat quasi quos reprehenderit tempore ullam vel?',
            },
            {
                id: 2,
                title: 'DEF',
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa dicta dolorem doloribus eveniet fuga, illum iste labore modi neque nisi, nostrum odit placeat quasi quos reprehenderit tempore ullam vel?',
            },
        ],
    },
};

let o = {
    default: 'home',
    route: {
        home: {
            path: '#/home/',
            template_url: './tpl/home.html',
            data: {
                name: '王发发',
                login: {
                    username: 'whh',
                    password: '',
                },
            },
            hook: {
                after: () => {
                    let article_container = document.getElementById('article-list');
                    let article_list = app_data.article.list;
                    

                    article_list.forEach( (article)=> {
                        let el_item = document.createElement('div');
                        el_item.innerHTML = `
                            <a href = "#">${article.title}</a>
                            <div>${article.content}</div>
                        `;
                    article_container.appendChild(el_item);
                    });
                }
            },
        },
        about: {
            path: '#/about',
            template_url: './tpl/about.html',
            data: {
                name: 'lsd',
                age: 19,
            },
        },
        article: {
            path: '#/article',
            template_url: './tpl/article.html',
            data: {},
            hook: {
                after: () => {
                    let form = document.getElementById('create-article');
                    form.addEventListener('submit',(e) => {
                        e.preventDefault();

                        let row = {};
                        row.title = form.querySelector('[name=title]').value;
                        row.content = form.querySelector('[name=content]').value;

                        app_data.article.list.push(row);

                        form.reset();
                    });
                },
            },
        },
    },
};

let route = new Route(o);