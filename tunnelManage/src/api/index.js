import axios from '../utils/request'
import base from './base'

const api = {
    /**
     * 登录
     * @param {*} params 
     * @returns 
     */
    getLogin(params) {
        return axios.post(base.baseUrl + base.login,params)
    },
    /**
     * 获取动态导航数据
     * @param {用户权限} params 
     */
    getRouter(params) {
        return axios.get(base.baseUrl + base.router, {
            params
        })
    },
    getLine() {
        return axios.get(base.baseUrl + base.line)
    },
    /**
     * 读取隧道信息
     */
    getProject(params) {
        return axios.get(base.baseUrl + base.projectInfo, {
            params
        })
    },
    /**
     * 搜索隧道信息
     */
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    /**
     * 获取数据总数
     */
    getTotal() {
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 添加隧道
     * @param {*} params 
     * @returns 
     */
    getAddProject(params) {
        return axios.get(base.baseUrl + base.addProject, {
            params
        })
    }
}

export default api;