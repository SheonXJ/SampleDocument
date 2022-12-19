const express = require('express')
const router = express.Router()

const question = require('../../../models/question')

router.get('/', (req, res) => {
  res.send('213')
  // res.render('view')
})

module.exports = router
