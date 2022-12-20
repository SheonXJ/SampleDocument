const express = require('express')
const router = express.Router()

const Question = require('../../../models/question')
const Score = require('../../../models/score')

router.get('/:id/:option', (req, res) => {
  const option = req.params.option
  const nextQuestionId = req.query.next
  const questionNumber = req.query.number
  // 在cookie儲存user選擇的答案
  const userAnswer = req.cookies.document?.cookieAnswer || []
  if (option) userAnswer[questionNumber] = option
  res.cookie('document', { cookieAnswer: userAnswer })
  res.redirect(`/questions/${nextQuestionId}`)
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  // 在cookie取得已答題目的答案
  const cookieAnswer = req.cookies.document?.cookieAnswer || []
  Question.find()
    .lean()
    .then(questions => {
      let currentQuestionIndex = 0
      let nextQuestion = {}
      if (id) currentQuestionIndex = questions.findIndex(q => q._id.toString() === id)
      // 取得當前題目和選項
      const currentQuestion = questions[currentQuestionIndex]
      // 判斷是否為最後一題，在選項按鈕上附加下一題ID
      if ((currentQuestionIndex + 1) >= questions.length) {
        nextQuestion = questions[currentQuestionIndex]
      } else {
        nextQuestion = questions[currentQuestionIndex + 1]
      }
      // 將user已作答的題目答案，整理進data questions裡
      cookieAnswer?.forEach((ans, index) => {
        questions[index].userAnswer = ans
      })
      return res.render('index', { questions, currentQuestion, nextQuestion, cookieAnswer, currentQuestionIndex })
    })
    .catch(err => console.log(err))
})
router.get('/', (req, res) => {
  // 在cookie取得已答題目的答案
  const cookieAnswer = req.cookies.document?.cookieAnswer || []
  Question.find()
    .lean()
    .then(questions => {
      const currentQuestionIndex = 0
      const currentQuestion = questions[currentQuestionIndex]
      const nextQuestion = questions[currentQuestionIndex + 1]
      // 將user已作答的題目答案，整理進data[questions]裡
      cookieAnswer?.forEach((ans, index) => {
        questions[index].userAnswer = ans
      })
      return res.render('index', { questions, currentQuestion, nextQuestion, cookieAnswer, currentQuestionIndex })
    })
    .catch(err => console.log(err))
})
router.post('/', async (req, res) => {
  const cookieAnswer = req.cookies.document?.cookieAnswer || []
  // 取得題目答案後，與cookie的答案對比，算出分數
  const questions = await Question.find().lean()
  const questionsAnswer = questions.map(question => question.answer)
  let correctCount = 0
  for (let i = 0; i < questions.length; i++) {
    if (questionsAnswer[i] === cookieAnswer[i]) correctCount++
  }
  const score = Math.floor(correctCount * (100 / questions.length))
  await Score.create({
    userId: '63a1caa547064ccac2545e66',
    score
  })
  res.clearCookie('document')
  return res.redirect('/users/63a1caa547064ccac2545e66')
})

module.exports = router
