

const mongoClient = require('mongodb').MongoClient
const state = {
  db: null
}

module.exports.connect = function (done) {
  const url = process.env.DATABASE_URL || "mongodb+srv://govi:govi@cluster0.qmc6cnq.mongodb.net/CharityContent?retryWrites=true&w=majority"
  const dbname = 'CharityContent'
  // const url = process.env.DATABASE_URL || "mongodb+srv://govi:govi@cluster0.qmc6cnq.mongodb.net/TestCharityContent?retryWrites=true&w=majority"
  // const dbname = 'TestCharityContent'

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err)
    state.db = data.db(dbname)
    done()
  })
}


module.exports.get = function () {
  return state.db
}
