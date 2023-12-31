const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const koaStatic = require("koa-static");
const { REDIS_CONF } = require("./conf/db");
const { SESSION_SECRET_KEY } = require("./conf/secretKeys");
const path = require("path");
const router = require("./routes");
const cors = require('koa2-cors');
// error handler
onerror(app);



// middlewares
app.use(cors())
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + "/public"));
app.use(koaStatic(path.join(__dirname, "..", "uploadFiles")));
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

app.keys = [SESSION_SECRET_KEY];
app.use(
  session({
    key: "weibo.sid", // cookie name 默认是 `koa.sid`
    prefix: "weibo:sess:", // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 单位 ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
router(app);
module.exports = app;
