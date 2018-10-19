const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos')
    //   .find({ _id: new ObjectID('5bc9fb38ec3db4379998cea9') })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log('Todos')
    //       console.log(JSON.stringify(docs, undefined, 2))
    //     },
    //     err => console.log('Unable to fetch todos', err)
    //   )

    // db.collection('Todos')
    //   .find()
    //   .count()
    //   .then(
    //     count => console.log(`Todos count: ${count}`),
    //     err => console.log('Error while counting', err)
    //   )

    db.collection('Users')
      .find({ name: 'Yuriy' })
      .toArray()
      .then(
        docs => {
          console.log('Users')
          console.log(JSON.stringify(docs, undefined, 2))
        },
        err => console.log('Error while fetching users', err)
      )

    // client.close()
  }
)
