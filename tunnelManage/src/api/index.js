import axios from '../utils/request'
import base from './base'

const api = {
    /**
     * 登录
     * @param {*} params 
     * @returns 
     */
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
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
    },
    /**
     * 根据id删除隧道
     * @param {id} params 
     * @returns 
     */
    getDeleteProject(params) {
        return axios.get(base.baseUrl + base.delProject, {
            params
        })
    },
    getPreProject(params) {
        return axios.get(base.baseUrl + base.pre, {
            params
        })
    },
    /**
     * 隧道更新
     * @param {} params 
     */
    getUpdateProject(id, params) {
        return axios.put(base.baseUrl + base.updateProject + id, params)
    },
    /**
     * 隧道设计信息 tree->一级
     * @returns 隧道设计信息
     */
    getTunnelList() {
        return axios.get(base.baseUrl + base.tunnelList)
    },
    /**
     * 隧道设计信息 tree->二级
     * @param {一级信息id} params 
     * @returns 
     */
    getTunnelListChild(params) {
        return axios.get(base.baseUrl + base.tunnelListChild, {
            params
        })
    },
    /**
     * 隧道设计信息-content
     * @param {*} params 
     * @returns 
     */
    getTunnelContent(params) {
        return axios.get(base.baseUrl + base.tunnelContent, {
            params
        })
    },
    /**
     * 隧道设计信息-content-上传
     */
    getUploadTunnelContent(params) {
        return axios.get(base.baseUrl + base.uploadTunnelContent, {
            params
        })
    },
    /**
     * 隧道设计信息 - pdf预览
     * @param {参数: id} params 
     * @returns 
     */
    getPDFPreView(params) {
        return axios.get(base.baseUrl + base.pdfPreView, {
            params
        })
    },
    /**
     * 
     * @returns 获取所有用户
     */
    getUserList() {
        return axios.get(base.baseUrl + base.userList)
    },
    /**
     * 查找用户
     * @param {username, permission, phone} params 
     * @returns 
     */
    getUserSearch(params) {
        return axios.get(base.baseUrl + base.userSearch, {
            params
        })
    },
    /**
     * 添加用户
     */
    getDeleteUser(params) {
        return axios.get(base.baseUrl + base.deleteUser, {
            params
        })
    },
    /**
     * 用户预更新
     */
    getUserPreview(params) {
        return axios.get(base.baseUrl + base.userPreview, {
            params
        })
    },
    /**
     * 用户修改
     */
    getUserUpdate(params) {
        return axios.get(base.baseUrl + base.userUpdate, {
            params
        })
    }
}

export default api;