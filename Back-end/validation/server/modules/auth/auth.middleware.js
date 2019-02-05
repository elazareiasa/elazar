const jwt = require('jsonwebtoken')
const {APP_SECRET, TOKEN_EXPIRE_SECONDS} = process.env

const false_res = {
  auth: false,
  token:null,
  message: 'you are logged out'
}

const tokenize = id => jwt.sign({id}, APP_SECRET, {expiresIn:parseInt(TOKEN_EXPIRE_SECONDS)})

const verify_auth = async (req, res, next) => {
  try{

    const token = req.headers['x-access-token']
    if(!token) return res.json({
      ...false_res,
      message: 'no token provided'
    })

    const decoded = await jwt.verify(token, APP_SECRET)
    // if(!decoded) return res.json(false_res)
    req.ueser_id = decoded.id
    next()
  } catch(err) {

      res.status(401).send({
        ...false_res,
        message: 'Unauthorized - Failed to authenticate token'
      })
    }
}

module.exports = {
  false_res,
  tokenize,
  verify_auth
}