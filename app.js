const express = require("express"); 

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const path = require("path");

const { requireAuth } = require("./middlewares/auth");
const { sequelize } = require("./models");

async function main() {
	await sequelize.sync({alter: true }); 
}
main();

//on synchronise la base de données et le back

require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
  });
// On paramètre les headers nécessaires, dont celui des credentials, important pour le cookie

app.use(bodyParser.urlencoded({ extended: true }));
app.get(bodyParser.json);

app.use(cookieParser());

app.get("/jwtid", requireAuth, (req, res) => {
	return res.status(200).send(res.locals.user)
});

//la route qui vérifie le token

app.use(
	"/profil",
	express.static(path.join(__dirname, "uploads", "profil"))
);
app.use(
	"/post",
	express.static(path.join(__dirname, "uploads", "post"))
);

//les routes d'upload des images

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);

//les routes des controlleurs

module.exports = app;
