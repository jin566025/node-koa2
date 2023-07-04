const jwt = require("jsonwebtoken");
const { SECRET } = require("../conf/constants");
//检查token是否过期
module.exports = async (ctx, next) => {
  if (ctx.request.header["authorization"]) {
    let token = ctx.request.header["authorization"];
    //解码token
    let decoded = jwt.decode(token, SECRET);
    // let userInfo = decoded.userInfo;
    //console.log(decoded) ：{ userInfo: {}, iat: 1494405235, exp: 1494405235 }
    if (token && decoded.exp <= new Date() / 1000) {
      ctx.body = { msg: "token过期", success: false, notoken: true, code: 600 };
    } else {
      return next();
    }
  } else {
    ctx.body = { msg: "没有token", success: false, notoken: true, code: 600 };
  }
};
