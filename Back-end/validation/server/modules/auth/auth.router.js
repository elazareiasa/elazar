const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const user_model = require('../user/user.model')
const {false_res, tokenize, verify_auth} = require('./auth.middleware')

router.use(express.json())

router.post('/register', async(req, res, next) =>{
  try {
    const  hash_password = await bcrypt.hash(req.body.password, 10)
    const user_data = {
      ...req.body,
      password: hash_password
    }

    const user = await user_model.create(user_data)
    const token = tokenize(user._id)
    return res.status(200).json({
      auth: true,
      token,
      user
    })
  } catch(error){
    res.status(402).json(error)
  }
})


router.get('/loggin', async (req, res, next) => {
  try {
    const {email} = req.body
    const user = await user_model.findOne({email})
    if(!user) return res.status(402).send('')
    const is_password_valid = await bcrypt.compare(req.body.password, user.password)
    if(!is_password_valid) res.status(402).json(false_res)

    const token = tokenize(user._id)

    return res.status(200).json({
      auth: true,
      token
    })

  } catch(error) {
      next(error)
    }

})

router.get('/logout', async (req, res)=> {
  return res.status(200).json(false_response)
})

router.get('/me', verify_auth , async (req, res)=> {
  const user = await user_model.findById(req.user_id);
  if (!user) return res.status(404).json({message:'No user found.'});
  res.status(200).json(user);
})

module.exports = router