const { getUserInfo } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { registerUserNameNotExistInfo } = require("../result/ErrorModel");
const isExist = async ({userName}) => {
  //const { userName } = ctx.request.query;
  const userInfo = await getUserInfo({ userName });
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};
module.exports = {
  isExist,
};
