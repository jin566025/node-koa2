const Sequelize = require("sequelize");
const seq = require("../db/seq");

const AtRelation = seq.define("atRelation", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  blogId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = AtRelation;
