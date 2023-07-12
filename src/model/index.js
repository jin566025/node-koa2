const Sequelize = require("sequelize");
const User = require("./User");
const Blog = require("./Blog");
const UserRelation = require("./UserRelation");
const AtRelation = require("./AtRelation");
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
Blog.hasMany(AtRelation, {
  foreignKey: "blogId",
});

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
};
