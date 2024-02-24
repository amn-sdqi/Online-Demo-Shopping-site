const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const authRoutes = require("./routes/auth.route");
const createSessionConfig = require("./config/sessions");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

db.connect_database()
	.then(function () {
		app.listen(3000);
	})
	.catch(function () {
		console.log("Faild to connect to the database");
		console.log("ERROR");
	});
