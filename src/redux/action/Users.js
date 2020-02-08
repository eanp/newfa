import axios from 'axios'
import { APP_URL } from './config'
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const url = APP_URL.concat(`admin/user`)
const headers = {
    Authorization: `Bearer ` + token
}

export const getAdminUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(url, { headers: headers })
    }
}

export const postAdminUser = (data) => {
    return {
        type: 'POST_USER',
        payload: axios.post(url, qs.stringify(data))
    }
}

export const putAdminUser = (id, data) => {
    return {
        type: 'PUT_USER',
        payload: axios.put(url.concat(`/${id}`), qs.stringify(data), { headers: headers })
    }
}

export const deleteAdminUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: axios.delete(url.concat(`/${id}`), { headers: headers })
    }

}