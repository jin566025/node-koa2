const router = require("koa-router")();
const { saveFile } = require("../controller/utils");
const checkToken = require("../middlewares/checkToken.js");

router.prefix("/api/utils");
router.post("upload", koaForm(), async (ctx, next) => {
  const file = ctx.req.files["file"];
  const { size, path, name, type } = file;
  ctx.body = await saveFile({ size, path, name, type });
});
module.exports = router;
