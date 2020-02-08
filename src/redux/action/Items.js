import axios from 'axios'
import { APP_URL } from './config'
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const url = APP_URL.concat(`admin/items`)
const headers = {
    Authorization: `Bearer ` + token
}

export const getAdminItems = () => {
    return {
        type: 'GET_ITEMS',
        payload: axios.get(url, { headers: headers })
    }
}
export const nextItems = (nexturl) => {
    return {
        type: 'NEXT_ITEMS',
        payload: axios.get(nexturl, { headers: headers })
    }
}

export const postAdminItems = (data) => {
    return {
        type: 'POST_ITEMS',
        payload: axios.post(url, qs.stringify(data), { headers: headers })
    }
}

export const putAdminItems = (id, data) => {
    return {
        type: 'PUT_ITEMS',
        payload: axios.put(url.concat(`/${id}`), qs.stringify(data), { headers: headers })
    }
}

export const deleteAdminItems = (id) => {
    return {
        type: 'DELETE_ITEMS',
        payload: axios.delete(url.concat(`/${id}`), { headers: headers })
    }

}
export const putImageAdminItems = (id, data) => {
    return {
        type: 'PUT_IMAGEITEMS',
        payload: axios.put(url.concat(`/foto/${id}`), data, { headers: headers })
    }
}