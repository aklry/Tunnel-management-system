const express = require('express')

const router = express.Router()
const url = require('url')
const SQLConnect = require('./SQLConnect')
const jwt = require('jsonwebtoken')
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
module.exports = router