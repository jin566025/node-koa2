const { Blog, User } = require("../model/index");

(async function () {
  //创建用户
  const zhangsan = await User.create({
    username: "zhangsan",
    password: "123456",
    nickname: "张三",
  });
  const zhangsanId = zhangsan.dataValues.id;
  const lisi = await User.create({
    username: "lisi",
    password: "123456",
    nickname: "李四",
  });
  const listId = lisi.dataValues.id;
  const blog1 = await Blog.create({
    title: "标题1",
    content: "内容1",
    userId: listId,
  });
  const blog2 = await Blog.create({
    title: "标题2",
    content: "内容2",
    userId: listId,
  });
  const blog3 = await Blog.create({
    title: "标题3",
    content: "内容3",
    userId: zhangsanId,
  });
})();
