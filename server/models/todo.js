// const mongoose = require('mongoose')
const { mongoose } = require('../db/mongoose')

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    minLength: 1,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {
  Todo
}
