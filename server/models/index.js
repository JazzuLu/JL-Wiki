import mongoose from 'mongoose'
import config from '../global.config'

import User from './user'
import Article from './article'
import Category from './category'

const dbURI = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`

/** 链接数据库之后的预设操作 **/
mongoose.connect(dbURI).then(async (r) => {

  /** 创建超级管理员 **/
  const superAdmin = await User.findOne({ role: 'superAdmin', username: config.admin.username, }).exec();
  if(!superAdmin) {
    await User.create({ role: 'superAdmin', ...config.admin })
  }

  /** 创建默认分类 **/
  const defaultCategory = await Category.findOne({ title: '默认分类' }).exec();
  if(!defaultCategory) {
    await Category.create({ title: '默认分类', keywords: '默认分类', description: '默认分类', })
  }

}).catch(error=>{
  console.warn('数据库连接失败', error)
})

export default {
  User,
  Article,
  Category,
}

