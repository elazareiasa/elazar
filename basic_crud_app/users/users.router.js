const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')

const router = express.Router()
const dataPath = './users/users.data.json'
const enc = 'utf-8'

router.use(bodyParser.json())
router.use(morgan('dev'))

router.get('/', (req, res) => {
  let usersData = JSON.parse(fs.readFileSync(dataPath, enc))
  res.send(usersData)
} )

router.post('/', (req,res) => {
  let data = fs.readFileSync(dataPath, enc)
  if(!data) {
    data = {"users": [req.body]}
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
    res.send(`got FIRST user ${req.body}`)
    return
  } 

  data = JSON.parse(fs.readFileSync(dataPath, enc))

  let newUser = req.body

  data.users.push(newUser)

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
  res.send(`got a user ${req.body}`)
})

router.delete('/', (req,res) => {
  let data = JSON.parse(fs.readFileSync(dataPath, enc)) 
  let {users} = data
  let index = 0
  for(let user of users) {
    if(user.id === req.body.id) {
      data.users.splice(index, 1)
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
      res.send('user was deleted')
      return
    }
    index++
  }
  res.send('DELETE request')
})

router.put('/', (req, res) => {
  let data = JSON.parse(fs.readFileSync(dataPath, enc)) 
  let index = 0, exsit = false
  for(let user of data.users) {
    if(user.name === req.body.name || user.age === req.body.age){
      data.users[index] = req.body
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
      res.send(`${req.body.name} was added (PUT)`)
      return
    }
    index++
  }
  const newId = data.users[index - 1].id
  req.body.id = newId + 1
  data.users.push(req.body)
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
  res.send(`${req.body.name} new user was added (PUT)`)
})


module.exports = router