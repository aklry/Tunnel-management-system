import axios from '../utils/request'
import base from './base'

const api = {
    getLogin(params) {
        return axios.post(base.baseUrl + base.login,params)
    }
}

export default api;