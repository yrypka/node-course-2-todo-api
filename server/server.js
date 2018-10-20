const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text })
  const result = await todo
    .save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(process.env.PORT || 3000, () =>
  console.log('Todo Api server started on localhost:3000')
)
