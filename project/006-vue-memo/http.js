window.http = {
    post: function(url, data={}) {
        data.app_key = '011f7e5369129844977b35e3b27b321769004f9d017b3d91d0aacb570d2f0d99';
        data.timestamp = (new Date).getTime();
        data.signature = this.sign(data.app_key, data.timestamp);

        return axios
            .post('http://mock.biaoyansu.com/api/' + url, data)
            .then(function(res) {
                return res;
            });
    },

    sign: function(app_key, timestamp) {
        return btoa(app_key + timestamp);
    },
};