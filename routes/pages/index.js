// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組
const questions = require('./modules/questions')

// 設定路由
router.use('/questions', questions)
router.get('/', (req, res) => {
  res.redirect('/questions')
})

module.exports = router
