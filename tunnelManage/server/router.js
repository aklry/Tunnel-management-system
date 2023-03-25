const express = require('express')

const router = express.Router()
const url = require('url')
//添加接口
router.get('/list', (req, res) => {
    res.send({
        status: 200,
        msg: '测试服务器'
    })
})

module.exports = router