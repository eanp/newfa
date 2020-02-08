import axios from 'axios'
import { APP_URL } from './config'
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const url = APP_URL.concat(`login`)
const headers = {
    Authorization: `Bearer ` + token
}

export const postLogin = (data) => {
    return {
        type: 'POST_LOGIN',
        payload: axios.post(url,data)
    }
}