const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { authCheck } = require("./middlewares/auth");
const path = require("path");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");


async function main(){
	await sequelize.sync({alter: true})

}
main()

require("dotenv").config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	
	res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
	next();
});
app.get(bodyParser.json);
//app.get("*", authCheck);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);


module.exports = app;
