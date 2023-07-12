const router = require("koa-router")();
const { saveFile } = require("../controller/utils");
const checkToken = require("../middlewares/checkToken.js");
const koaForm = require("formidable-upload-koa");
router.prefix("/api/utils");
router.post("/upload", koaForm(), async (ctx, next) => {
  const file = ctx.req.files["file"];
  if (!file) {
    return;
  }
  const { size, path, name, type } = file;
  ctx.body = await saveFile({ size, filePath: path, name, type });
});
module.exports = router;
