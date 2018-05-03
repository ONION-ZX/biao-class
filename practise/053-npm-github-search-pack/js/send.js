var ele = require('./element');

function request(method,url) {
  ele.http.open(method,url);
  ele.http.send();
}

module.exports = {
  request: request,
}
