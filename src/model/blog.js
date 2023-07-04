const Sequelize = require("sequelize");
const seq = require("../seq");

const Blog = seq.define("blog", {
  title: {
    title: Sequelize.STRING,
    allowNULL: false,
  },
  content:{
    type: Sequelize.STRING,
    allowNULL: false,
  },
  userid:{
    type: Sequelize.STRING,
    allowNULL: false,
  }
});

module.exports = {
  Blog,
};
