const router = require("koa-router")();
const checkToken = require("../middlewares/checkToken.js");
const userValidate = require("../validator/user.js");
const { getUserInfoByToken } = require("../utils/utils");
const { genValidator } = require("../middlewares/validator.js");
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  getFans,
  follow,
  unFollow,
  getFollowers
} = require("../controller/user.js");
router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, { userName, password });
});
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender, nickName } = ctx.request.body;
  ctx.body = await register({ userName, password, gender, nickName });
});
router.get("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.query;
  ctx.body = await isExist({ userName });
});
router.post("/changeInfo", genValidator(userValidate), async (ctx, next) => {
  const { city, picture, nickName } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { city, picture, nickName });
});
router.post(
  "/changePassword",
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    ctx.body = await changePassword(ctx, { password, newPassword });
  }
);
router.get("/getFans", async (ctx, next) => {
  const { userId } = ctx.request.query;
  ctx.body = await getFans({ userId });
});

router.post("/follow", async (ctx, next) => {
  let userInfo = getUserInfoByToken(ctx);
  const userId = userInfo.id;
  const { followerId } = ctx.request.body;
  ctx.body = await follow({ userId, followerId });
});
router.post("/unFollow", async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await unFollow({ id });
});
router.get("/getFollowers", async (ctx, next) => {
  const { userId } = ctx.request.query;
  ctx.body = await getFollowers({ userId });
});
module.exports = router;
