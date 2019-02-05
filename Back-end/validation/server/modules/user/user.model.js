const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: String,
  email: String,
  phone: String,
  password: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel

// 'rachel.g.avatar.yav@dddd.com'
// dsfsdgdhjg