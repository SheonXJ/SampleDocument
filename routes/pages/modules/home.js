const express = require('express')
const router = express.Router()

const question = require('../../../models/question')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
