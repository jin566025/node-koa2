const Sequelize = require("sequelize");
const seq = require("../db/seq");

const Blog = seq.define("blog", {
  userId: {
    type: Sequelize.INTEGER,
    allowNULL: false,
    comment: "用户id",
  },
  content: {
    type: Sequelize.TEXT,
    allowNULL: false,
    comment: "内容",
  },
  image: {
    type: Sequelize.STRING,
    comment: "图片地址",
  },
});

module.exports = Blog;
