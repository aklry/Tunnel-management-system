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
    const arr = [name,number,money,address,duration,startTime,endTime,quantity,status,remark]
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
module.exports = router