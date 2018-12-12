import axios from 'axios';

const APP_KEY = '1bdb42f3008f72ef55ad9e3c5ff3946c2de93387a028e47299c290dc2062f62a';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';

function sign(app_key, timestamp) {
    return btoa(app_key + timestamp);
}

export default function api(url, params) {
    let timestamp = (new Date).getTime();
    let signature = sign(APP_KEY, timestamp);

    let opt = {
        headers: {
            'BIAO-MOCK-APP-KEY': APP_KEY,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE': signature,
        },
    };

    url = BASE_API + url;
    return axios
        .post(url, params, opt)
        .then(r => {
            return r.data;
        });
}
