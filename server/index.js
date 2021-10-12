import './models'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import handle from './middlewares/handle'
import validate from './middlewares/validate'
import router from './router'

const app = require('express')();

app.use(bodyParser.json({ limit: '50mb' }))
  .use(cookieParser())
  .use(handle)
  .use(validate)
  .use(router)

module.exports = {
  path: '',
  handler: app
}
