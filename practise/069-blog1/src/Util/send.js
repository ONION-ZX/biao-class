const ok = true;
const data = {
  list: {
    article: [
      {
        'id': 1,
        'title': '叫我王花花',
        'content': 'Lorem ipsum dolor sit amet, consect'
      },
      {
        'id': 2,
        'title': '叫我李栓蛋',
        'content': 'Lorem ipsum dolor sit amet, consect'
      },
      {
        'id': 3,
        'title': '叫我刘贝贝',
        'content': 'Lorem ipsum dolor sit amet, consect'
      },
    ],
    tag: [
      {
        'id': 1,
        'name': 'HTML',
      },
      {
        'id': 2,
        'name': '生活',
      },
      {
        'id': 3,
        'name': 'CSS',
      },
    ],
  },
}

const get = (url, on_succeed, on_fail) => {
  let model = url.split('/')[2];

  if(ok)
    if(on_succeed)
      on_succeed(data.list[model]);
    else {
      if(on_fail)
        on_fail({
          ok: false,
          message: 'invalid page',
        });
    }
}

const output = {
  get,
  // post,
}

export default output;
