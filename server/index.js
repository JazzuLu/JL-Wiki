import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './models'
import router from './router'
import handle from './middlewares/handle'
import validate from './middlewares/validate'
import User from "./models/user";

const app = require('express')();

// app.get('/hello', (req, res) => {
//   res.send('Hello World!')
// })


// app.use(cookieParser());
app.use(bodyParser.json())
  .use(handle)
  .use(validate)
  .use(router)

module.exports = {
  path: '',
  handler: app
}
