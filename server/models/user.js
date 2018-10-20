// const mongoose = require('mongoose')
const { mongoose } = require('./db/mongoose')

const User = mongoose.model('User', {
  email: {
    type: String,
    minLength: 1,
    required: true,
    trim: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

module.exports = {
  User
}
