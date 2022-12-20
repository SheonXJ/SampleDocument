const express = require('express')
const dateformat = require('dateformat')
const router = express.Router()

const User = require('../../../models/user')
const Score = require('../../../models/score')

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const scoreList = await Score.find({ where: userId }).lean().sort({ createdAt: -1 })
  const user = await User.findById(userId).lean()
  scoreList.forEach(score => {
    score.createdAt = dateformat(score.createdAt, 'yyyy-mm-dd HH:mm:ss')
  })
  return res.render('score', { scoreList, user })
})

module.exports = router
