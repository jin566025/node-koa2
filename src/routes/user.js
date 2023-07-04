const router = require('koa-router')()
const checkToken  = require('../utils/checkToken.js')
// const user = require('../../controller/user/user.js')
// router.post('/user/getAll',checkToken,user.getAll)

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})





module.exports = router


