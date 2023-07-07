const router = require("koa-router")();
const checkToken = require("../utils/checkToken.js");
const userValidate = require("../validator/user.js");
const { genValidator } = require("../middlewares/validator.js");
const { isExist, register } = require("../controller/user.js");
router.prefix("/api/user");

router.get("/login", function (ctx, next) {
  ctx.body = "this is a users/bar response";
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
