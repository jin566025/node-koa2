const jwt = require("jsonwebtoken");
const { SECRET } = require("../conf/constants");
module.exports = (userInfo) => {
  const token = jwt.sign(
    {
      userInfo: userInfo,
    },
    SECRET,
    {
      expiresIn: "86400s", //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    }
  );
  return token;
};
