const isPro = process.env.NODE_ENV === 'production'

export default {
  mongodb: {
    host: 'localhost',
    database: 'blog',
    port: 27017,
    user: '',
    pass: '',
  },
  app: {
    domain: isPro ? 'https://www.86886.wang' : 'http://127.0.0.1:3000',
  },
  admin: {    /** 默认用户 **/
    username: 'root',
    password: '123456',
    email: '358881374@qq.com',
  },
  jwt: {
    expiresIn: 365 * 86400,
    secret: 'jl_wiki', // 如果部署到线上，一定要修改
  },
  pm2: {
    host: '116.196.17.78',
    repo: 'git@github.com:wmui/blog.git',
    path: '/root/blog',
  },
}
