const xss = require("xss");
const {
  getBlogListByUser,
  createBlog,
  getFollowersBlogList,
} = require("../services/blog");
const { getUserInfoByToken } = require("../utils/utils");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { createBlogFailInfo } = require("../result/ErrorModel");
const { getSquareCacheList } = require("../cache/blog");
const getProfileBlogList = async (ctx, { pageIndex = 1, pageSize = 10 }) => {
  let userInfo = getUserInfoByToken(ctx);
  let userName = userInfo && userInfo.userName ? userInfo.userName : "";
  const blog = await getBlogListByUser({ userName, pageIndex, pageSize });
  return new SuccessModel({
    data: blog,
  });
};
const create = async (ctx, { content, image }) => {
  let userInfo = getUserInfoByToken(ctx);
  let userId = userInfo.id;
  try {
    const blog = await createBlog({ userId, content: xss(content), image });
    return new SuccessModel({
      data: blog,
    });
  } catch (e) {
    console.log("createBlogFailInfo", e);
    return new ErrorModel(createBlogFailInfo);
  }
};
const getSquareBlogList = async ({ pageIndex, pageSize }) => {
  const blog = await getSquareCacheList({ pageIndex, pageSize });
  return new SuccessModel({
    data: blog,
  });
};

const getHomeBlogList = async ({ userId, pageIndex = 1, pageSize = 10 }) => {
  const blog = await getFollowersBlogList({ userId, pageIndex, pageSize });
  return new SuccessModel({
    data: blog,
  });
};
module.exports = {
  getProfileBlogList,
  create,
  getSquareBlogList,
  getHomeBlogList,
};
