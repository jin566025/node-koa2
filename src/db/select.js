const { Blog, User } = require("../model/index");

(async function () {
  //   const zhangsan = await User.findOne({
  //     where: {
  //       userName: "zhangsan",
  //     },
  //   });
  //   console.log("zhangsan",zhangsan.dataValues)

  //   const zhangsanName = await User.findOne({
  //     attributes: ["username", "nickname"],
  //     where: {
  //       userName: "zhangsan",
  //     },
  //   });
  //   console.log("zhangsanName", zhangsanName.dataValues);

  //   const zhangsanBlogList = await Blog.findAll({
  //     where: {
  //       userId: 2,
  //     },
  //     order: [["id", "desc"]],
  //   });
  //   console.log(
  //     "zhangsanBlogList",
  //     zhangsanBlogList.map((item) => item.dataValues)
  //   );

  //   const blogPageList = await Blog.findAll({
  //     limit: 2,
  //     offset: 0,
  //     order: [["id", "desc"]],
  //   });
  //   console.log(
  //     "blogPageList",
  //     blogPageList.map((item) => item.dataValues)
  //   );

  //   const blogListCount = await Blog.findAndCountAll({
  //     limit: 2,
  //     offset: 0,
  //     order: [["id", "desc"]],
  //   });
  //   console.log(
  //     "blogListCount",
  //     blogListCount.count,
  //     blogListCount.rows.map((item) => item.dataValues)
  //   );

  //   const blohListWithUser = await Blog.findAndCountAll({
  //     order: [["id", "desc"]],
  //     include: [
  //       {
  //         model: User,
  //         attributes: ["username", "nickname"],
  //         where: { username: "zhangsan" },
  //       },
  //     ],
  //   });
  //   console.log(
  //     "blohListWithUser",
  //     blohListWithUser.count,
  //     blohListWithUser.rows.map((item) => {
  //         let itemVal = item.dataValues
  //         itemVal.user = itemVal.user.dataValues
  //         return itemVal
  //     })
  //   );

  const blohListWithUser = await User.findAndCountAll({
    attributes: ["username", "nickname"],
    include: [
      {
        model: Blog,
      },
    ],
  });
  console.log(
    "blohListWithUser",
    blohListWithUser.count,
    blohListWithUser.rows.map((item) => {
      let itemVal = item.dataValues;
      itemVal.blogs = itemVal.blogs.map((blog) => blog.dataValues);
      return itemVal;
    })
  );
})();
