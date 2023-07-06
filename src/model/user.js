const Sequelize = require("sequelize");
const seq = require("../db/seq");

const User = seq.define("user", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名，唯一",
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "密码",
  },
  nickName: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "昵称",
  },
  gender: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    comment: "性别（1男性、2女性、3保密）",
    defaultValue: 3,
  },
  picture: {
    type: Sequelize.STRING,
    comment: "头像图片地址",
  },
  city: {
    type: Sequelize.STRING,
    comment: "城市",
  },
});

module.exports = User
