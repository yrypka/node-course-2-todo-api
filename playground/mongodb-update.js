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
    //   .findOneAndUpdate(
    //     { _id: new ObjectID('5bcb65d08ca15541e5969ca7') },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(result => console.log(result))

    // Challenge
    db.collection('Users')
      .findOneAndUpdate(
        { _id: new ObjectID('5bc9fc0cc3a31e5a2b02a67d') },
        {
          $set: {
            name: 'Yuriy'
          },
          $inc: {
            age: 1
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => console.log(result))

    // client.close()
  }
)
