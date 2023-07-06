const router = require("koa-router")();
const checkToken = require("../utils/checkToken.js");
const user = require('../controller/user.js')
// router.post('/user/getAll',checkToken,user.getAll)
const {isExist} = require('../controller/user.js')
router.prefix("/api/user");

router.get("/login", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});
router.get("/register", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});
router.get("/isExist",  async (ctx, next) => {
  const { userName } = ctx.request.query
  ctx.body = await isExist({userName})
});

module.exports = router;
