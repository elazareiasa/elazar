const mongoose = require('mongoose')
const clc = require('cli-color')

const { DB_HOST, DB_PORT, DB_NAME } = process.env
const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, 
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500, 
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, 
  socketTimeoutMS: 45000, 
  family: 4 // Use IPv4, skip trying IPv6
}

const connect = async() => {
  try {
    await mongoose.connect(uri, options)
    console.log(clc.green('connected to Mongodb'))
  }
  catch(err) {
    console.log(clc.red(error))
  }
}

module.exports = {connect}

