const Question = require('../question')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const SEED_QUESTION = [
  {
    topic: 'The baby birds were still hungry so their parents had to fly out to _____ more food.',
    A: 'get off',
    B: 'give up',
    C: 'look for',
    D: 'put on',
    answer: 'C'
  },
  {
    topic: 'Be ______ when you pick up the broken dishes. Don’t cut yourself.',
    A: 'careful',
    B: 'honest',
    C: 'polite',
    D: 'strong',
    answer: 'A'
  },
  {
    topic: 'The tall man over there is our new English teacher, ______?',
    A: 'is he',
    B: 'is there',
    C: 'isn’t he',
    D: 'isn’t there',
    answer: 'C'
  },
  {
    topic: 'Larry got up early this morning ______ she did not want to be late for her trip.',
    A: 'if',
    B: 'but',
    C: 'though',
    D: 'because',
    answer: 'B'
  },
  {
    topic: '______ you like some apple juice?',
    A: 'Does',
    B: 'Are',
    C: 'What',
    D: 'Would',
    answer: 'D'
  }
]

db.once('open', async () => {
  await Promise.all(
    SEED_QUESTION.map(seedQuestion => {
      return Question.create(seedQuestion)
    })
  )
  console.log('SEED_QUESTION done!')
  process.exit()
})
