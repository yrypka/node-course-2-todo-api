const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('../server')
const { Todo } = require('../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: Date.now()
  }
]

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => Todo.insertMany(todos))
    .then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    const [{ _id, text }] = todos
    request(app)
      .get(`/todos/${_id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
      })
      .end(done)
  })

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/${ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 for non-object ids', done => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const [, { _id, text }] = todos
    const hexId = _id.toHexString()

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toBeNull()
            done()
          })
          .catch(err => done(err))
      })
  })

  it('should return 404 if todo not found', done => {
    request(app)
      .delete(`/todos/${ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if object id is invalid', done => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    const hexId = todos[0]._id.toHexString()
    const text = 'Updated todo'

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ text: text, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        // expect(res.body.todo.completedAt).toBeA('number')
        expect(typeof res.body.todo.completedAt).toBe('number')
      })
      .end(done)
  })

  it('should clear completedAt when todo is not completed', done => {
    const hexId = todos[1]._id.toHexString()

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toBeNull()
      })
      .end(done)
  })
})
