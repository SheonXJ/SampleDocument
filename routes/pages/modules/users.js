const express = require('express')
const dateformat = require('dateformat')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../../models/user')
const Score = require('../../../models/score')

router.get('/login', (req, res) => {
  return res.render('login')
})
router.get('/register', (req, res) => {
  return res.render('register')
})
router.post('/register', async (req, res) => {
  const { name, account, password, confirmPassword } = req.body
  if (!name || !account || !password || !confirmPassword) {
    console.log('need to fill all input')
    return res.render('register', { name, account, password })
  }
  if (password !== confirmPassword) {
    console.log('password incorrect')
    return res.render('register', { name, account, password })
  }
  const user = await User.findOne({ account })
  if (user) {
    console.log('account already')
    return res.render('register', { name, account, password })
  }
  await User.create({
    name,
    account,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10, null))
  })
  console.log('create success')
  return res.redirect('/users/login')
})
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
