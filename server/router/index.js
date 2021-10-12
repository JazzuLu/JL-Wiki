import article from './article'
import user from './user'
import category from './category'
import check from '../middlewares/check'
const router = require('express').Router()


router
  .get('/api/admin',
    user.getAdmin)
  .post('/api/register',
    user.register)
  .post('/api/login',
    user.login)
  .post('/api/logout',
    check.auth('token'),
    user.logout)
  .patch('/api/password',
    check.auth('token'),
    user.patchPassword)
  .patch('/api/admin',
    check.auth('token'),
    user.patchAdmin)

router
  .get('/api/categories',
    check.filter('token'),
    category.getCategories)
  .get('/api/category/:id',
    category.getCategory)
  .post('/api/category',
    check.auth('token'),
    category.postCategory)
  .patch('/api/category/:id',
    check.auth('token'),
    category.patchCategory)
  .delete('/api/category/:id',
    check.auth('token'),
    category.deleteCategory)

router
  .get('/api/articles',
    check.filter('token'),
    article.getArticles)
  .get('/api/article/:id',
    check.filter('token'),
    article.getArticle)
  .get('/api/articles-top',
    check.filter('token'),
    article.getArticlesTop)
  .get('/api/articles-new',
    check.filter('token'),
    article.getArticlesNew)
  .get('/api/drafts',
    check.auth('token'),
    article.getDrafts)
  .post('/api/article',
    check.auth('token'),
    article.postArticle)
  .patch('/api/article/:id',
    check.auth('token'),
    article.patchArticle)
  .delete('/api/article/:id',
    check.auth('token'),
    article.deleteArticle)

export default router
