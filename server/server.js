const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true }
)

const saveTodo = todo =>
  todo
    .save()
    .then(doc => console.log('Saved todo', doc))
    .catch(err => console.log('Unable to save todo', err))

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

// const newTodo = new Todo({ text: 'Cook dinner' })
// saveTodo(newTodo)

// const otherTodo = new Todo({
//   text: 'Walk a dog',
//   completed: false,
//   completedAt: Date.now()
// })
// saveTodo(otherTodo)

// const otherTodo = new Todo({ text: ' Edit this todo ' })
// saveTodo(otherTodo)

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

const user = new User({
  email: 'asd@asd.com'
})
user
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err))
