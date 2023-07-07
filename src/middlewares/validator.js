const { ErrorModel } = require("../result/ResModel");
const { jsonSchemaFileInfo } = require("../result/ErrorModel");
const genValidator = (validateFn) => {
  const validator = async (ctx, next) => {
    const error = validateFn(ctx.request.query);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return
    }
    await next();
  };
  return validator;
};
module.exports = {
  genValidator,
};
