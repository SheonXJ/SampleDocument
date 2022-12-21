const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
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
router.get('/logout', function (req, res, next) {
  req.logout(err => {
    if (err) { return next(err) }
    res.clearCookie('document')
    return res.redirect('/users/login')
  })
})

module.exports = router
