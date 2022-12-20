const express = require('express')
const router = express.Router()

const Question = require('../../../models/question')

router.get('/:id', (req, res) => {
  const id = req.params.id
  Question.find()
    .lean()
    .then(questions => {
      let currentQuestion = questions[0]
      if (id) currentQuestion = questions.filter(q => q._id.toString() === id)[0]
      return res.render('index', { questions, currentQuestion })
    })
    .catch(err => console.log(err))
})
router.get('/', (req, res) => {
  const id = req.params.id
  Question.find()
    .lean()
    .then(questions => {
      let currentQuestion = questions[0]
      if (id) currentQuestion = questions.filter(q => q._id.toString() === id)[0]
      return res.render('index', { questions, currentQuestion })
    })
    .catch(err => console.log(err))
})

module.exports = router
