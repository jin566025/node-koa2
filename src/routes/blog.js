const router = require("koa-router")();
const checkToken = require("../middlewares/checkToken.js");
const {
  create,
  getProfileBlogList,
  getSquareBlogList,
  getHomeBlogList,
  getAtCount,
} = require("../controller/blog.js");
const blogValidate = require("../validator/blog.js");
const { genValidator } = require("../middlewares/validator.js");
const { getUserInfoByToken } = require("../utils/utils");
router.prefix("/api/blog");
router.post(
  "/create",
  checkToken,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body;
    ctx.body = await create(ctx, { content, image });
  }
);

router.get("/profile", async (ctx, next) => {
  let { pageIndex, pageSize } = ctx.request.query;
  if (pageIndex) {
    pageIndex = parseInt(pageIndex);
  }
  if (pageSize) {
    pageSize = parseInt(pageSize);
  }
  ctx.body = await getProfileBlogList(ctx, { pageIndex, pageSize });
});

router.get("/square", async (ctx, next) => {
  let { pageIndex, pageSize } = ctx.request.query;
  if (pageIndex) {
    pageIndex = parseInt(pageIndex);
  }
  if (pageSize) {
    pageSize = parseInt(pageSize);
  }
  ctx.body = await getSquareBlogList({ pageIndex, pageSize });
});
router.get("/homeList", async (ctx, next) => {
  let { pageIndex, pageSize, userId } = ctx.request.query;
  if (pageIndex) {
    pageIndex = parseInt(pageIndex);
  }
  if (pageSize) {
    pageSize = parseInt(pageSize);
  }
  ctx.body = await getHomeBlogList({ userId, pageIndex, pageSize });
});
router.get("/getAtCount", async (ctx, next) => {
  let { userId } = ctx.request.query;
  ctx.body = await getAtCount({ userId });
});
module.exports = router;
