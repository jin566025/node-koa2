const { User, UserRelation } = require("../model/index");
const { formatUser } = require("./_format");
const addFollower = async ({ userId, followerId }) => {
  const result = await UserRelation.create({
    userId,
    followerId,
    isDeleted: 0,
  });
  return result.dataValues;
};
const createUser = async ({ userName, password, gender = 3, nickName }) => {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName,
  });
  const data = result.dataValues;
  addFollower({ userId: data.id, followerId: data.id });
  return data
};
const login = () => {};
const getUserInfo = async ({ userName, password }) => {
  const whereOption = {
    userName,
  };
  if (password) {
    whereOption.password = password;
  }
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
const updateUser = async (
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) => {
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }
  const whereData = {
    userName,
  };
  if (password) {
    whereData.password = password;
  }
  const result = await User.update(updateData, {
    where: whereData,
  });
  return result[0] > 0;
};
const getUsersByFollower = async (followerId) => {
  const result = await User.findAndCountAll({
    attributes: ["id", "userName", "nickName", "picture"],
    order: [["id", "desc"]],
    include: [
      {
        model: UserRelation,
        where: { followerId },
      },
    ],
  });
  let userList = result.rows.map((row) => row.dataValues);
  userList = formatUser(userList);
  return {
    count: result.count,
    list: userList,
  };
};
const getFollowersByUser = async ({ userId }) => {
  const result = await UserRelation.findAndCountAll({
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "userName", "nickName", "picture"],
      },
    ],
    where: {
      userId,
    },
  });
  let userList = result.rows.map((row) => row.dataValues);
  userList = userList.map((item) => {
    let user = item.user;
    user = formatUser(user);
    return user;
  });

  return {
    count: result.count,
    list: userList,
  };
};

const deleteFollower = async ({ id }) => {
  const result = await UserRelation.update(
    {
      isDeleted: 1,
    },
    {
      where: {
        id,
      },
    }
  );
  return result[0] > 0;
};
module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUser,
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser,
};
