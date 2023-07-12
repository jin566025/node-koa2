const { Blog, User, UserRelation } = require("../model/index");
const { formatUser } = require("./_format");
const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({
    userId,
    content,
    image,
  });
  return result.dataValues;
};
const getBlogListByUser = async ({
  userName,
  pageIndex = 1,
  pageSize = 10,
}) => {
  const userWhereOptions = {};
  if (userName) {
    userWhereOptions.userName = userName;
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (pageIndex - 1),
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
        where: userWhereOptions,
      },
    ],
  });
  let blogList = result.rows.map((row) => row.dataValues);
  blogList = blogList.map((item) => {
    const user = item.user.dataValues;
    item.user = formatUser(user);
    return item;
  });
  return {
    list: blogList,
    count: result.count,
  };
};
const getFollowersBlogList = async ({
  userId,
  pageIndex = 0,
  pageSize = 10,
}) => {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (pageIndex - 1),
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: {
          userId,
        },
      },
    ],
  });
  let blogList = result.rows.map((row) => row.dataValues);
  blogList = blogList.map((item) => {
    const user = item.user.dataValues;
    item.user = formatUser(user);
    return item;
  });
  return {
    list: blogList,
    count: result.count,
  };
};
module.exports = {
  getBlogListByUser,
  createBlog,
  getFollowersBlogList,
};
