import token from '../utils/token'

const auth = name => async (req, res, next) => {
  const t = req.cookies[name] || req.get(name)
  if (!t) { res.handleError('请登录后操作') }
  try {
    res.locals.user = token.verify(t)
    next()
  } catch (error) {
    res.clearCookie(name)
    res.handleError('Token 无效', error)
  }
}

/** 针对 token 非必须的get接口，如果token无效只返回部分信息 **/
const filter = name => (req, res, next) => {
  const t = req.cookies[name] || req.get(name)
  res.locals.user = {}

  if (t) {
    try {
      res.locals.user = token.verify(t)
    } catch (error) {
      res.locals.user = {}
    }
  }
  next()
}

export default {
  auth,
  filter,
}
