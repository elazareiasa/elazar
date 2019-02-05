const express = require('express')
const clr = require('cli-color')

const usersRouter = require('./users/users.router')
const app = express()
const {log} = console

app.use('/users',usersRouter)
app.get('/', (req, res) => res.send('Hello World'))

const port = process.env.port || 3000

app.listen(port, () => log(clr.blueBright(`Example app listening on port ${port}!`)))