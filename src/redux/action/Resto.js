import axios from 'axios'
import { APP_URL } from './config'
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const url = APP_URL.concat(`admin/resto`)
const headers = {
    Authorization: `Bearer ` + token
}

export const getAdminResto = () => {
    return {
        type: 'GET_RESTO',
        payload: axios.get(url, { headers: headers })
    }
}

export const postAdminResto = (data) => {
    return {
        type: 'POST_RESTO',
        payload: axios.post(url, qs.stringify(data), { headers: headers })
    }
}

export const putAdminResto = (id, data) => {
    return {
        type: 'PUT_RESTO',
        payload: axios.put(url.concat(`/${id}`), qs.stringify(data), { headers: headers })
    }
}

export const deleteAdminResto = (id) => {
    return {
        type: 'DELETE_RESTO',
        payload: axios.delete(url.concat(`/${id}`), { headers: headers })
    }

}
export const putImageAdminResto = (id, data) => {
    return {
        type: 'PUT_IMAGERESTO',
        payload: axios.put(url.concat(`/foto/${id}`), data, { headers: headers })
    }
}