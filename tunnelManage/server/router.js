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
    const sql = `select * from project order by id desc limit 15 offset ${(page - 1) * 5}`
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
module.exports = router