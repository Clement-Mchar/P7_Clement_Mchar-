const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const path = require("path");

const cors = require("cors");
const { checkUser, requireAuth } = require("./middlewares/auth");
const { sequelize } = require("./models");

async function main() {
	await sequelize.sync({ alter: true });
}
main();

require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
app.use(express.json());

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	allowedHeaders: ["sessionId", "Content-Type"],
	exposedHeaders: ["sessionId"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.get(bodyParser.json);

app.use(cookieParser());

app.get(`${process.env.CLIENT_URL}`, checkUser);


app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200).send(res.locals.user)
});


app.use(
	"/profil",
	express.static(path.join(__dirname, "uploads", "profil"))
);
app.use(
	"/post",
	express.static(path.join(__dirname, "uploads", "post"))
);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
