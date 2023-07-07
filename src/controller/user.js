const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const doCrypto = require("../utils/crypt");
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
} = require("../result/ErrorModel");
const isExist = async ({ userName }) => {
  //const { userName } = ctx.request.query;
  const userInfo = await getUserInfo({ userName });
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};

const register = async ({ userName, password, gender, nickName }) => {
  const userInfo = await getUserInfo({ userName });
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
      nickName,
    });
    return new SuccessModel({ data: userName });
  } catch (e) {
    return new ErrorModel(registerFailInfo);
  }
};
module.exports = {
  isExist,
  register,
};
