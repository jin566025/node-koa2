const Sequelize = require("sequelize");
const seq = require("../db/seq");

const UserRelation = seq.define("userRelation", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  followerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UserRelation;
