const express = require('express')

const router = express.Router()
const url = require('url')
const SQLConnect = require('./SQLConnect')
const jwt = require('jsonwebtoken')
const adminData = require('./data/admin')
const vipData = require('./data/vip')
const lineData = require('./data/line')
//导入秘钥
const jwtSecret = require('./jwtSecret')
//文件上传插件
const multer = require('multer')
const fs = require('fs')
/**
 * 登录接口
 */
router.post('/login', (req, res) => {
    //接收客户端参数

    const { username, password } = req.body
    const sql = 'select * from user where username = ? and password = ?'
    SQLConnect(sql, [username, password], result => {
        if (result.length > 0) {
            /**
             * 生成token
             * token: 前后端在登录信息交互时，通过token验证是否登录成功守卫一个字段
             */
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username,
                permission: result[0].permission
            }, jwtSecret.secret)
            res.send({
                status: 200,
                username: result[0].username,
                permission: result[0].permission,
                token
            })
        } else {
            res.send({
                status: 500,
                msg: '用户名或密码错误'
            })
        }
    })
})
/**
 * 用户权限管理
 */
router.get('/router', (req, res) => {
    const user = url.parse(req.url, true).query.user
    switch (user) {
        case 'admin':
            res.send({
                status: 200,
                menuData: adminData
            })
            break;
        case 'vip':
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
        default:
            res.send({
                status: 200,
                menuData: vipData
            })
    }
})

router.get('/line', (req, res) => {
    res.send({
        status: 200,
        result: lineData
    })
})

/**
 * 隧道信息查询
 */
router.get('/project/all', (req, res) => {
    //分页
    let page = url.parse(req.url, true).query.page || 1
    const sql = "select * from project order by id desc limit 15 offset " + (page - 1) * 15
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 隧道模糊查询
 */
router.get('/project/search', (req, res) => {
    //接收参数 -->查询内容
    const search = url.parse(req.url, true).query.search

    const sql = "select * from project where concat(`name`, `address`,`remark`) like '%" + search + "%'"
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 200,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 获取总页数
 */
router.get('/project/total', (req, res) => {
    const sql = 'select count(*) from project where id'
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 200,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 隧道添加
 */
router.get('/project/add', (req, res) => {
    let name = url.parse(req.url, true).query.name || ''
    let number = url.parse(req.url, true).query.number || ''
    let money = url.parse(req.url, true).query.money || ''
    let address = url.parse(req.url, true).query.address || ''
    let duration = url.parse(req.url, true).query.duration || ''
    let startTime = url.parse(req.url, true).query.startTime || ''
    let endTime = url.parse(req.url, true).query.endTime || ''
    let quantity = url.parse(req.url, true).query.quantity || ''
    let status = url.parse(req.url, true).query.status || ''
    let remark = url.parse(req.url, true).query.remark || ''

    const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)"
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark]
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    })
})
/**
 * 隧道信息删除
 */
router.get('/project/delete', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const sql = 'delete from project where id=?'
    SQLConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})
/**
 * 隧道信息 预更新
 */
router.get('/project/update/pre', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const sql = 'select * from project where id = ?'
    SQLConnect(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result[0]
            })
        } else {
            res.send({
                status: 500,
                msg: '预更新失败'
            })
        }
    })
})
/**
 * 隧道更新
 */
router.put('/project/update/:id', (req, res) => {
    const id = req.params.id
    const {
        name,
        number,
        money,
        address,
        duration,
        startTime,
        endTime,
        quantity,
        status,
        remark
    } = req.body
    const sql = 'update project set name = ?, number = ?, money = ?, address = ?, duration = ?, startTime = ?, endTime = ?, quantity = ?, status = ?, remark = ? where id = ?'
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark, id]
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '修改成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '修改失败'
            })
        }
    })
})
/**
 * 隧道设计信息 tree列表 一级
 */
router.get('/tunnel/list', (req, res) => {
    const sql = 'select * from tunnel'
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 隧道设计信息 tree列表 二级
 */
router.get('/tunnel/list/child', (req, res) => {
    const cid = url.parse(req.url, true).query.cid
    const sql = 'select * from tunnelchild where cid = ?'
    SQLConnect(sql, [cid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 隧道设计信息 内容
 */
router.get('/tunnel/content', (req, res) => {
    const content = url.parse(req.url, true).query.content
    const sql = 'select * from tunnelcontent where content = ?'
    SQLConnect(sql, [content], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 文件上传
 * http://localhost:3000/api/upload
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

const uploadFolder = './upload/';
createFolder(uploadFolder);
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 更新隧道设计信息 -content-url
 */
router.get('/tunnel/content/url', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const urlName = url.parse(req.url, true).query.urlName
    const sql = 'update tunnelcontent set url = ? where id = ?'
    SQLConnect(sql, [urlName, id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '上传成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '上传失败'
            })
        }
    })
})
/**
 * pdf预览
 */
router.get('/tunnel/pdf', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const sql = 'select * from tunnelcontent where id = ?'

    SQLConnect(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result[0]
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 用户列表
 */
router.get('/user/list', (req, res) => {
    const sql = 'select * from user'
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 搜索用户
 */
router.get('/user/search', (req, res) => {
    const searchContent = url.parse(req.url, true).query.searchContent
    const sql = "select * from user where concat(`username`, `permission`,`phone`) like '%" + searchContent + "%'"
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 添加用户
 */
router.get('/user/add', (req, res) => {
    const username = url.parse(req.url, true).query.username
    const password = url.parse(req.url, true).query.password
    const permission = url.parse(req.url, true).query.permission
    const phone = url.parse(req.url, true).query.phone

    const sql = 'insert into user values(null, ?, ?, ?, ?)'
    SQLConnect(sql, [username, password, permission, phone], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    })
})
/**
 * 删除用户
 */
router.get('/user/delete', (req, res) => {
    const id = url.parse(req.url, true).query.id

    const sql = 'delete from user where id = ?'
    SQLConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})
/**
 * 用户预更新
 */
router.get('/user/preview', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const sql = 'select * from user where id = ?'

    SQLConnect(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 用户修改
 */
router.get('/user/update', (req, res) => {
    const id = url.parse(req.url, true).query.id
    const password = url.parse(req.url, true).query.password
    const permission = url.parse(req.url, true).query.permission
    const phone = url.parse(req.url, true).query.phone

    const sql = 'update user set password = ?,permission = ?, phone = ? where id = ?'
    SQLConnect(sql, [password, permission, phone, id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '修改成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '修改失败'
            })
        }
    })
})
module.exports = router