require('md5')
import globalConfig from '../global.config'
import token from '../utils/token'
import User from '../models/user'

/** todo：待完成 **/
const register = async (req, res, next) => {
  const msg = req.checkBody({
    code: {
      required: '验证码不能为空',
    },
    username: {
      required: '用户名不能为空',
    },
    password: {
      required: '密码不能为空',
      range: { min: 6, max: 30, message: '密码介于6-30个字符之间' },
    },
  })
  if (msg) return res.handleError(msg)

  try {
    const { body } = req
    if (md5(body.code) !== req.cookies.code) { res.handleError('验证码错误') }

  } catch (error) {
    res.handleError('注册失败', error)
  }
}

const login = async (req, res, next) => {
  const msg = req.checkBody({
    // code: {
    //   required: '验证码不能为空',
    // },
    username: {
      required: '用户名不能为空',
    },
    password: {
      required: '密码不能为空',
      // range: { min: 5, max: 30, message: '密码介于5-30个字符之间' },
    },
  })
  if (msg) return res.handleError(msg)

  // try {
    const { body } = req
    if (md5(body.code) !== req.cookies.code) { res.handleError('验证码错误') }
    const user = await User.findOne({
      username: body.username,
      password: body.password,
    }).exec()
    console.log('user',user)
    if (user) {
      const t = token.sign(user)
      res.cookie('token', t, {
        maxAge: globalConfig.jwt.expiresIn * 1000, // 与jwt有限期一致，cookie是毫秒
        httpOnly: true,
      })
      res.clearCookie('code')
      res.handleSuccess({ token: t })
    } else {
      res.handleError('用户名或密码错误')
    }
  // } catch (error) {
  //   res.handleError('登录失败', error)
  // }
}

const logout = (req, res) => {
  res.clearCookie('token')
  res.handleSuccess()
}

const getAdmin = async (req, res, next) => {
  try {
    const user = await User.find().exec()
    res.handleSuccess(user)
  } catch (error) {
    res.handleError('信息获取失败', error)
  }
}

const patchAdmin = async (req, res, next) => {
  try {
    const { body } = req
    const user = await User.findOneAndUpdate({
      role: 'superAdmin',
    }, body).exec()
    res.handleSuccess(user)
  } catch (error) {
    res.handleError('信息修改失败', error)
  }
}

const patchPassword = async (req, res, next) => {
  const msg = req.checkBody({
    oldPassword: {
      required: '密码不能为空',
      range: { min: 6, max: 30, message: '密码介于6-30个字符之间' },
    },
    newPassword: {
      required: '密码不能为空',
      range: { min: 6, max: 30, message: '密码介于6-30个字符之间' },
    },
  })

  if (msg) return res.handleError(msg)

  try {
    const {
      oldPassword,
      newPassword,
    } = req.body

    const realOldPassword = md5(oldPassword)
    const user = await User.findOne({
      role: 'superAdmin',
    }).exec()

    if (user && user.password !== realOldPassword) { res.handleError('原始密码错误') }

    await User.findOneAndUpdate({
      role: 'superAdmin',
    }, {
        password: newPassword,
      }).exec()
    res.clearCookie('token')
    res.handleSuccess()
  } catch (error) {
    res.handleError('密码修改失败', error)
  }
}

export default {
  register,
  login,
  logout,
  getAdmin,
  patchAdmin,
  patchPassword,
}
