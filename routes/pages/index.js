// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組
const home = require('../pages/modules/home')

// 設定路由
router.use('/', home)

module.exports = router
