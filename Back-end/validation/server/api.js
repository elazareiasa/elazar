require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const clc = require('cli-color')

const db = require('./db/mongoose')
const user_router = require('./modules/user/user.router')
const auth_router = require('./modules/auth/auth.router')
const app = express()

const {NODE_ENV,API_PORT,API_HOST} = process.env

app.use(morgan('dev'))

app.use('/api/users', user_router)
app.use('/api/auth', auth_router)

app.get('/', (req,res) => {
  res.status(200).send('HomePage')
})

app.get('*', (req, res) => {
  res.status(404).json("page not found")
})

db.connect()

app.listen(API_PORT,API_HOST, (error) => {
  if(error) console.log(clc.red(error))
  else console.log(clc.magenta('express api is live'))
})
