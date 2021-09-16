import jwt from 'jsonwebtoken'
import md5 from 'md5'
import globalConfig from '../global.config'

console.log(globalConfig)
const { secret, expiresIn } = globalConfig.jwt

// {username: 'q', _id: 'asdf'} => token
const sign = (user) => {
  return jwt.sign({
    username: user.username,
    role: user.role,
    userId: user._id,
  }, md5(secret), {
    expiresIn,
  })
}

// token => {username: 'q', userId: 'asdf'}
const verify = (token) => {
  return jwt.verify(token, md5(secret))
}

export default {
  sign,
  verify,
}
