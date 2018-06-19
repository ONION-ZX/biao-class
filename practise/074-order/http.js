window.http = {
  post: function (url, data) {
    data = data || {};

    data.app_key = 'f908f3fcd0c133cce89a04cac38cad16eebc7aa5fe917a5025e7c26ce70790d7';
    data.timestamp = (new Date).getTime();
    data.signature = this.sign(data.app_key, data.timestamp);

    return axios
      .post('http://mock.biaoyansu.com/api/' + url, data)
      .then(function (res) {
        return res;
      });
  },

  sign: function (app_key, timestamp) {
    return btoa(app_key + timestamp);
  },
};
