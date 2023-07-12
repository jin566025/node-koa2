const jwt = require("jsonwebtoken");
const { SECRET } = require("../conf/constants");
const getUserInfoByToken = (ctx) => {
  console.log("ctx.request.header",ctx.request.header)
  if (ctx.request.header["authorization"]) {
    let token = ctx.request.header["authorization"];
    let decoded = jwt.decode(token, SECRET);
    let userInfo = decoded.userInfo;
    return userInfo;
  } else {
    return null;
  }
};

module.exports = {
  getUserInfoByToken,
};
