const { isProd } = require("../utils/env");
let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "jinct",
};
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
