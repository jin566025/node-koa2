const { loginCheckFailInfo } = require("../result/ErrorModel");
const { ErrorModel } = require("../result/ResModel");
const loginCheck = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }
  ctx.body = new ErrorModel(loginCheckFailInfo);
};
module.exports = {
  loginCheck,
};
