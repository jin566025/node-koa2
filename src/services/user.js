const { User } = require("../model/index");
const { formatUser } = require("./_format");
const register = () => {};
const login = () => {};
const getUserInfo = async ({ userName, password }) => {
  const whereOption = {
    userName,
  };
  if (password) {
    whereOption.password = password;
  }
  console.log("UserUserUserUser",User)
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
  register,
  login,
  getUserInfo,
};
