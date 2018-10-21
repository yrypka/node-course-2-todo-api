const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// Todo.deleteMany({}).then(result => console.log(result))

// Todo.findOneAndDelete({ _id: '5bccb2dd8ca15541e596c1ae' }).then(todo =>
//   console.log(todo)
// )

// Todo.findByIdAndDelete('5bccb2dd8ca15541e596c1ae').then(todo =>
//   console.log(todo)
// )
