import axios from 'axios'
import { APP_URL } from './config'
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const iduser = Cookie.get('iduser');
const restoid = Cookie.get('restoid');
const url = APP_URL.concat(`restaurant`)
const headers = {
    Authorization: `Bearer ` + token
}

export const getRestoItems = () => {
    return {
        type: 'GET_ITEMS',
        payload: axios.get(url.concat(`/${iduser}`), { headers: headers })
    }
}
// export const nextItems = (nexturl) => {
//     return {
//         type: 'NEXT_ITEMS',
//         payload: axios.get(nexturl, { headers: headers })
//     }
// }

export const postRestoItems = (data) => {
    return {
        type: 'POST_ITEMS',
        payload: axios.post(url.concat(`/${restoid}`), qs.stringify(data), { headers: headers })
    }
}

export const putRestoItems = (id, data) => {
    return {
        type: 'PUT_ITEMS',
        payload: axios.put(url.concat(`/${id}`), qs.stringify(data), { headers: headers })
    }
}

export const deleteRestoItems = (id) => {
    return {
        type: 'DELETE_ITEMS',
        payload: axios.delete(url.concat(`/${id}`), { headers: headers })
    }

}
export const putImageRestoItems = (id, data) => {
    return {
        type: 'PUT_IMAGEITEMS',
        payload: axios.put(url.concat(`/foto/${id}`), data, { headers: headers })
    }
}
