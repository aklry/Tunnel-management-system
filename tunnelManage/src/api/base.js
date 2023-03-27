/**
 * 存放所有网络请求地址
 */

const base = {
    baseUrl: 'http://localhost:3000', //公共地址
    login: '/api/login', //登录地址
    router: '/api/router', //用户权限
    line: '/api/line', //折线图数据
    projectInfo: '/api/project/all', //隧道信息
    search: '/api/project/search',    //搜索数据
    total: '/api/project/total', //获取数据总数
    addProject: '/api/project/add', //添加隧道
}

export default base