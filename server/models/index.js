import mongoose from 'mongoose'
import config from '../global.config'

import User from './user'
import article from './article'

const dbURI = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`

/** 链接数据库之后的预设操作 **/
mongoose.connect(dbURI).then(async (r) => {

  /** 创建超级管理员 **/
  const user = await User.findOne({ role: 'superAdmin', username: config.admin.username, }).exec();
  if(!user) {
    await User.create({ role: 'superAdmin', ...config.admin })
  }

}).catch(error=>{
  console.warn('数据库连接失败', error)
})

export default {
  User,
  article,
}

