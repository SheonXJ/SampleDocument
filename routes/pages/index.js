// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../../middleware/auth')

// 引入模組
const questions = require('./modules/questions')
const users = require('./modules/users')

// 設定路由
router.use('/questions', authenticator, questions)
router.use('/users', users)
router.get('/', (req, res) => {
  res.redirect('/questions')
})

module.exports = router
