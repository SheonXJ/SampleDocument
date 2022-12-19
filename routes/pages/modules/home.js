const express = require('express')
const router = express.Router()

const question = require('../../../models/question')

router.get('/', (req, res) => {
  res.render('score')
})

module.exports = router
