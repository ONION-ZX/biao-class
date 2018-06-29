import axios from 'axios';

const APP_KEY = '459d8f8f5e2d2c3efe3d21ed6466cdb65440fbc86ba6d04da41c8f807a031d0c';
const BASE_API = 'http://mock.biaoyansu.com/api/';

function sign(app_key, timestamp) {
    return btoa(app_key + timestamp);
}

export default function api(url, params) {
    let timestamp = (new Date).getTime();
    let signature = sign(APP_KEY, timestamp);

    let opt = {
        headers: {
            'biao-mock-app-key': APP_KEY,
            'biao-mock-timestamp': timestamp,
            'biao-mock-signature': signature,
        },
    };

    url = BASE_API + url;
    return axios
        .post(url, params, opt)
        .then(r => {
            return r.data;
        });
}
