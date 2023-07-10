const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const createToken = require("../middlewares/createToken");
const doCrypto = require("../utils/crypt");
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require("../result/ErrorModel");
const isExist = async ({ userName }) => {
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
const login = async ({ ctx, userName, password }) => {
  let userInfo = await getUserInfo({
    userName,
    password: doCrypto(password),
  });
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo == userInfo;
  }
  const token = createToken(userInfo);
  userInfo.token = token;
  return new SuccessModel({ data: userInfo });
};
module.exports = {
  isExist,
  register,
  login,
};
