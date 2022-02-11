const mongoose = require('mongoose')
const config = require('../config')

const DBConnect = connection(config.DB_URL)

function connection(DB_URL) { 
  try {
    const conn = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Connected to ${DB_URL} database...`)
    console.log('Connection has been established successfully.');
    return conn
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

module.exports = {
    DBConnect
}
