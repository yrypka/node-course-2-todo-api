const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// const id = '5bcbc0003284e940516825d4'

// if (!ObjectID.isValid(id)) {
//   return console.log('Id not valid')
// }

// Todo.find({ _id: id }).then(todos => console.log('Todos', todos))

// Todo.findOne({ _id: id }).then(todo => console.log('Todo', todo))

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found')
//     }
//     console.log('Todo By Id', todo)
//   })
//   .catch(err => console.log(err))

const id = '5bcb9e54331be0480be76029'
User.findById(id)
  .then(user => {
    if (!user) {
      return console.log('User not found')
    }
    console.log(JSON.stringify(user, undefined, 2))
  })
  .catch(err => console.log(err))
