const http = require("http");
const app = require("./app");

const { sequelize } = require("./models");


const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

//on force le port à retourner un nombre

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

//on set le port avec la variable d'environnement OU le port 5000

const errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === "string" ? "pipe" + address : "port: " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
	}
};
//fonction pour vérifier le droit d'accès au back / si le port n'est pas déjà utilisé

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + port;
	console.log("Listening on " + bind);
});

server.listen((port), async () => {
	console.log("Server up on http://localhost:5000");
	await sequelize.authenticate();
	console.log("database connected");
});

//on vérifie que la bdd est bien connecté et on met le back en route