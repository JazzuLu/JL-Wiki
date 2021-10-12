import Article from '../models/article'
import Category from '../models/category'

const getList = async (req, res, findOption) => {
  const { role } = res.locals.user
  const { page = 1 } = req.query
  let { limit = 20 } = req.query
  // 最大数量限制
  if (limit > 50) {
    limit = 20
  }

  const skipCount = Number((page - 1) * limit)
  const limitCount = Number(limit)

  try {
    const total = (await Article.find({
      isPublish: true,
      ...findOption,
    }).exec()).length

    const data = await Article.find({
      isPublish: true,
      ...findOption,
    })
      .populate({
        path: 'category',
        select: 'id title isShow',
      })
      .skip(skipCount)
      .limit(limitCount)
      .sort({
        createdAt: -1,
      })
      .exec()
    // 非管理员，只返回公开文章，文章必须有分类

    let arts = JSON.parse(JSON.stringify(data))
    if (role !== 'superAdmin') {
      arts = arts.filter(i => i.category.isShow === true)
    }

    res.handleSuccess(arts, { total })
  } catch (error) {

    res.handleError('文章获取失败', error, 404)
  }
}

const checkArticleBody = (req,res) => {
  let msg = req.checkBody({
    title: {
      required: '标题不能为空',
      range: { min: 1, max: 100, message: '标题介于1-100个字符之间' },
    },
    content: {
      required: '内容不能为空',
      range: { min: 1, max: 10000, message: '内容介于1-10000个字符之间' },
    },
    // category: {
    //   required: '分类不能为空',
    // },
  })
  if(msg) res.handleError(msg);
  return msg;
}
// articles?limit=15&page=1
// articles?category=asdf&limit=15&page=1
// articles?keywords=js&limit=15&page=1
// articles?status=1&limit=15&page=1
let getArticles = async (req, res, next) => {
  // 默认返回首页推荐的文章
  let findOption = { status: 2, }

  if (req.query.keywords) {
    const reg = new RegExp(decodeURIComponent(req.query.keywords), 'i')
    findOption = {
      $or: [{
        title: {
          $regex: reg,
        },
      }, {
        content: {
          $regex: reg,
        },
      }],
    }
  }
  if (req.query.category) {
    findOption = {
      category: req.query.category,
    }
  }

  await getList(req, res, findOption)
}

let getArticlesTop = async (req, res, next) => {
  getList(req, res, { status: 3 })
}

// 最新文章
let getArticlesNew = async (req, res, next) => {
  getList(req, res, { isPublish: true })
}

// 草稿文章
let getDrafts = async (req, res, next) => {
  getList(req, res, { isPublish: false })
}

let getArticle = async (req, res, next) => {
  const { role } = res.locals.user
  const { id } = req.params
  // 草稿和私有分类文章拦截处理
  try {
    const article = await Article.findOne({
      _id: id,
    }).populate({
      path: 'category',
      select: 'id title isShow',
    }).exec()

    const stateMap = {
      1: role === 'superAdmin',
      2: article.isPublish && article.category && article.category.isShow, // 公开分类
      3: article.isPublish && !article.category,
    }
    if (stateMap[1] || stateMap[2] || stateMap[3]) {
      await Article.findByIdAndUpdate(id, {
        views: article.views + 1,
      }).exec()
      res.handleSuccess(article)
      return
    }
    // 无权限
    res.handleError('没有权限', {}, 404)
  } catch (error) {
    res.handleError('文章内容获取失败', error, 404)
  }
}

let postArticle = async (req, res, next) => {
  if (checkArticleBody(req,res)) return;
  try {
    const { body } = req
    if (!body.category) {
      // 默认分类
      const def = await Category.findOne({ title: '默认分类' }).exec()
      body.category = def && def.id
    }
    const article = await new Article(body).save()
    res.handleSuccess(article)
  } catch (error) {
    res.handleError('文章添加失败', error)
  }
}

let patchArticle = async (req, res, next) => {
  if (checkArticleBody(req,res)) return;
  try {
    const { body } = req
    const { id } = req.params
    const article = await Article.findByIdAndUpdate(id, body).exec()
    res.handleSuccess(article)
  } catch (error) {
    res.handleError('文章更新失败', error)
  }
}

let deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = await Article.findByIdAndRemove(id).exec()
    res.handleSuccess(body)
  } catch (error) {
    res.handleError('文章删除失败', error)
  }
}

export default {
  getArticles,
  getArticlesTop,
  getArticlesNew,
  getDrafts,
  getArticle,
  postArticle,
  patchArticle,
  deleteArticle,
}
