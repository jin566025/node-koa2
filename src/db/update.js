const { Blog, User } = require("../model/index");

(async function () {
  const zhangsan = await User.update(
    {
      nickname: "张三啊2",
    },
    {
      where: {
        username: "zhangsan",
      },
    }
  );
})();
