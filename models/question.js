const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  A: {
    type: String,
    required: true
  },
  B: {
    type: String,
    required: true
  },
  C: {
    type: String,
    required: true
  },
  D: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Question', questionSchema)
