const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
//解决跨域
app.use(cors())
app.use('/api', router)

app.listen(3000, () => {
    console.log('server run at port 3000')
})