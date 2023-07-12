const {
  getUserInfo,
  createUser,
  updateUser,
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser,
} = require("../services/user");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { getUserInfoByToken } = require("../utils/utils");
const createToken = require("../middlewares/createToken");
const doCrypto = require("../utils/crypt");
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
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
const login = async (ctx, { userName, password }) => {
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

const changeInfo = async (ctx, { nickName, city, picture }) => {
  let userInfo = getUserInfoByToken(ctx);
  if (!nickName) {
    nickName = userInfo.userName ? userInfo.userName : "";
  }
  const result = await updateUser(
    { newNickName: nickName, newCity: city, newPicture: picture },
    { userName: userInfo.userName }
  );

  if (result) {
    Object.assign(userInfo, { nickName, city, picture });
    return new SuccessModel({ data: userInfo });
  }
  return new ErrorModel(changeInfoFailInfo);
};
const changePassword = async (ctx, { password, newPassword }) => {
  let userInfo = getUserInfoByToken(ctx);
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName: userInfo.userName, password: doCrypto(password) }
  );
  if (result) {
    return new SuccessModel({ data: null });
  }
  return new ErrorModel(changePasswordFailInfo);
};

const getFans = async ({ userId }) => {
  const result = await getUsersByFollower(userId);
  if (result) {
    return new SuccessModel({ data: result });
  }
  return new ErrorModel(changePasswordFailInfo);
};
const follow = async ({ userId, followerId }) => {
  try {
    let result = await addFollower({ userId, followerId });
    return new SuccessModel({ data: result });
  } catch (err) {
    return new ErrorModel(changePasswordFailInfo);
  }
};
const unFollow = async ({ id }) => {
  try {
    let result = await deleteFollower({ id });
    return new SuccessModel({ data: null });
  } catch (err) {
    return new ErrorModel(changePasswordFailInfo);
  }
};
const getFollowers = async ({ userId }) => {
  const result = await getFollowersByUser({userId});
  if (result) {
    return new SuccessModel({ data: result });
  }
  return new ErrorModel(changePasswordFailInfo);
};
module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  getFans,
  follow,
  unFollow,
  getFollowers
  
};
