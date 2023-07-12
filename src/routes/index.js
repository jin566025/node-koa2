const user = require('./user');
const utils = require("./utils")
const blog = require('./blog')
module.exports = function(app){
	app.use(user.routes()).use(user.allowedMethods())
	app.use(utils.routes()).use(utils.allowedMethods())
	app.use(blog.routes()).use(blog.allowedMethods())
}
