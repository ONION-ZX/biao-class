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
            },
            hook: {
                after: function() {
                    let list = app_data.article.list;
                    let el_list = document.getElementById('article-list');

                    list.forEach(row => {
                        let el_item = document.createElement('div');
                        el_item.innerHTML = `
                            <a href = "#>${row.title}</a>
                        `;

                        el_list.appendChild(el_item);
                    });
                }
            }
        },
        about: {
            path: '/about',
            template_url: './tpl/about.html',
            data: {
                name: '王fafa',
                age: 10,
            },
        },
    },
    hook: {
        before: function() {},
        after: function() {},
    },
};

let route = new route(o);