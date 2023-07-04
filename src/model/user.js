const Sequelize = require("sequelize");
const seq = require("../seq");

const User = seq.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING,
    comment: "昵称",
  },
});

const Blog = seq.define("blog", {
  title: {
    type: Sequelize.STRING,
    allowNULL: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNULL: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNULL: false,
  },
});

Blog.belongsTo(User, {
  foreignKey: "userId",
});

// User.hasMany(Blog,{
//   foreignKey: "userId",
// })

module.exports = {
  User,
  Blog,
};
