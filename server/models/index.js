import mongoose from 'mongoose'
import config from '../global.config'

const {mongodb} = config

import User from './user'
import article from './article'

// mongoose.connect('mongodb://localhost:27017/blog')
mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`).then(r => {})

export default {
  User,
  article,
}

