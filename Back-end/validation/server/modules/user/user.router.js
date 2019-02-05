const express = require('express')
const router = express.Router()
const Joi = require('joi')


const user_model = require('./user.model')

router.use(express.json())

const userSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  phone: Joi.string().regex(/^[0-9]{7,10}$/).required(),
  password: Joi.string().required()
})

const joi_validator = schema => async (req, res, next) => {
  try {
    await Joi.validate(req.body, schema)
    next()
  }catch(error) {res.status(422).json(error)}
}

router.get('/', async (req, res, next) => {
  try {
    const users = await user_model.find().select(
      `_id
      name
      email
      phone`)
      res.status(200).json(users)
  }catch(error) { next(error) }
})

router.post('/', joi_validator(userSchema) , async(req, res, next) => {
  try {
    const user = await user_model.create(req.body)
    res.status(200).json(user)
  }catch(error) { next(error) }
})

router.put('/:id', async(req, res, next)=> {
  try {
    Joi.validate(req.body, userValidator, async (err,value) => {
      if(err) {
        res.status(422).json(err)
      }
      else {
        const user = await user_model.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          {new: true, upsert:true})

        res.status(200).json(user)
        }
    })

  }catch(error) { next(error) }
})

router.patch('/:id', async(req, res, next)=> {
  try {
    const user = await user_model.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true, upsert:true})

    res.status(200).json(user)
  }catch(error) { next(error) }
})

router.delete('/:id', async(req, res, next) => {
  try {
    const user = await user_model.findByIdAndRemove(req.params.id)
    res.status(200).json(user)
  }catch(error) { next(error) }
})

// router.get('/', async(req, res) => {
//   const users = await user_model.find({name:'rachel'}).select(
//     `_id
//     name
//     email
//     phone`)
//     res.status(200).json(users)
// })


module.exports = router


