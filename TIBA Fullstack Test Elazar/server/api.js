require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const clc = require('cli-color')

const app = express()

const {API_PORT,API_HOST} = process.env 

app.use(morgan('dev'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.get('/', (req,res) => {
  res.status(200).send('HomePage')
})

app.get('/Categories', (req,res) => {
  const categories = ["Choose", "Sport", "Toys", "School", "Motors", "Art", "Garden", "Industrial"]
  res.status(200).send(categories)
})

app.get('*', (req, res) => {
  res.status(404).json("page not found")
})


app.listen(API_PORT,API_HOST, (error) => {
  if(error) console.log(clc.red(error))
  else console.log(clc.magenta(`express api is live at localhost:${API_PORT}`))
})