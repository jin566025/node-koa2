const Sequelize = require("sequelize");
const User = require("./User");
const Blog = require("./Blog");
const UserRelation = require("./UserRelation");
Blog.belongsTo(User, {
  foreignKey: "userId",
});
Blog.belongsTo(UserRelation, {
  foreignKey: "userId",
  targetKey: "followerId",
});
UserRelation.belongsTo(User, {
  foreignKey: "followerId",
});
User.hasMany(UserRelation, {
  foreignKey: "userId",
});
module.exports = {
  User,
  Blog,
  UserRelation,
};
