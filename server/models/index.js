import mongoose from 'mongoose'

import User from './user.model'
import article from './article.model'

mongoose.connect('mongodb://localhost:27017/blog')

console.log('==========',User)

export default {
  User,
  article,
}

