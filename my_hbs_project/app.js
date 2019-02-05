const express = require('express')
const bodyParser = require('body-parser')
const morgan 	   = require('morgan')
const exp_hbs  	 = require('express-handlebars')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

const hbs_options = {
	extname	: '.hbs',
	layoutsDir 	: 'views/layouts/',
	partialsDir 	: 'views/partials/',
	defaultLayout	: 'main'
}

app.engine('hbs', exp_hbs(hbs_options));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('homepage')
})


 
// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })
 
app.listen(3000, ()=> {
  console.log('Express server listening on port 3000')
})


// const app = express()

// app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// app.set('view engine', 'handlebars')
 
// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })
 
// app.listen(3030, ()=> {
//   console.log('Express server listening on port 3030')
// })

// const express = require('express')
// const app = express()
 
// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })
 
// app.listen(3030, ()=> {
//   console.log('Express server listening on port 3000')
// })