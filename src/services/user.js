const { User } = require("../model/index");
const { formatUser } = require("./_format");
const createUser = async ({ userName, password, gender = 3, nickName }) => {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName,
  });
  return result.dataValues
};
const login = () => {};
const getUserInfo = async ({ userName, password }) => {
  const whereOption = {
    userName,
  };
  if (password) {
    whereOption.password = password;
  }
  console.log("UserUserUserUser", User);
  const result = await User.findOne({
    attributes: ["id", "userName", "nickName", "picture", "city"],
    where: whereOption,
  });
  if (result == null) {
    return result;
  }
  const formatRes = formatUser(result.dataValues);
  return formatRes;
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
