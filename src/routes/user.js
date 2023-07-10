const router = require("koa-router")();
const checkToken = require("../middlewares/checkToken.js");
const userValidate = require("../validator/user.js");
const { genValidator } = require("../middlewares/validator.js");
const { isExist, register, login } = require("../controller/user.js");
router.prefix("/api/user");

router.get("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.query;
  ctx.body = await login({ ctx, userName, password });
});
router.get("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender, nickName } = ctx.request.query;
  ctx.body = await register({ userName, password, gender, nickName });
});
router.get("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.query;
  ctx.body = await isExist({ userName });
});

module.exports = router;
