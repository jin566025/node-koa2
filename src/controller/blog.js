const xss = require("xss");
const {
  getBlogListByUser,
  createBlog,
  getFollowersBlogList,
} = require("../services/blog");
const {
  getAtRelationCount,
  updateAtRelation,
} = require("../services/atRelation");
const { getUserInfo } = require("../services/user");
const { getUserInfoByToken } = require("../utils/utils");
const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { createBlogFailInfo } = require("../result/ErrorModel");
const { getSquareCacheList } = require("../cache/blog");
const { createAtRelation } = require("../services/atRelation");
const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require("../conf/constants");
const getProfileBlogList = async (ctx, { pageIndex = 1, pageSize = 10 }) => {
  let userInfo = getUserInfoByToken(ctx);
  let userName = userInfo && userInfo.userName ? userInfo.userName : "";
  const blog = await getBlogListByUser({ userName, pageIndex, pageSize });
  return new SuccessModel({
    data: blog,
  });
};
const getAtCount = async ({ userId }) => {
  const result = await getAtRelationCount({ userId });
  return new SuccessModel({
    data: result,
  });
};
const create = async (ctx, { content, image }) => {
  let userInfo = getUserInfoByToken(ctx);
  let userId = userInfo.id;
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName);
    return matchStr;
  });

  const atUserList = await Promise.all(
    atUserNameList.map((userName) => getUserInfo({ userName }))
  );
  const atUserIdList = atUserList.map((user) => user.id);
  try {
    const blog = await createBlog({ userId, content: xss(content), image });
    await Promise.all(
      atUserIdList.map((userId) =>
        createAtRelation({ blogId: blog.id, userId })
      )
    );
    return new SuccessModel({
      data: blog,
    });
  } catch (e) {
    console.log("atUserNameList", e);
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
const markAsRead = async ({ userId }) => {
  try {
    await updateAtRelation({ userId, newIsRead: true, isRead: true });
  } catch (e) {}
};
module.exports = {
  getProfileBlogList,
  create,
  getSquareBlogList,
  getHomeBlogList,
  getAtCount,
  markAsRead,
};
