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
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
})

// const newTodo = new Todo({ text: 'Cook dinner' })
// saveTodo(newTodo)

const otherTodo = new Todo({
  text: 'Walk a dog',
  completed: false,
  completedAt: Date.now()
})
saveTodo(otherTodo)
