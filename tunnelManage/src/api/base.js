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
    delProject: '/api/project/delete', //删除隧道
    pre: '/api/project/update/pre', //预更新
    updateProject: '/api/project/update/', //隧道更新
    tunnelList: '/api/tunnel/list', //隧道设计信息 tree->一级
    tunnelListChild: '/api/tunnel/list/child', //隧道设计信息 tree->二级
    tunnelContent: '/api/tunnel/content', //隧道设计信息-content
    uploadTunnelContent: '/api/tunnel/content/url', //隧道设计信息-content-上传
    pdfPreView: '/api/tunnel/pdf', //pdf预览
    userList: '/api/user/list', //用户列表
    userSearch: '/api/user/search', //查找用户
    addUser: '/api/user/add', //用户添加
    deleteUser: '/api/user/delete', //用户删除
    userPreview: '/api/user/preview', //用户预更新
    userUpdate: '/api/user/update', //用户修改
}

export default base