import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './models'

const app = require('express')();

// app.get('/hello', (req, res) => {
//   res.send('Hello World!')
// })

console.log('db=========:=',db)

// app.use(cookieParser());
app.use(bodyParser.json());



// Error
// app.use((err, _req, res, _next) => {
//   if (err.name === 'UnauthorizedError') {
//     return res.sendStatus(401);
//   }
//   console.error('api route error', err);
//   res.sendStatus(err.statusCode || 500);
// });


app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// 储存用户名密码
app.post('/admin/signup',  async (req, res)=> {
  const article = await new db.User(req.body).save()
  console.log('article',article)
  res.send(article)
})

module.exports = {
  path: 'api',
  handler: app
}
