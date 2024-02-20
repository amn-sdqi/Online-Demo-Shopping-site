const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const db = require("./data/database");
const { log } = require("console");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

db.connect_database()
	.then(function () {
		app.listen(3000);
	})
	.catch(function () {
		console.log("Faild to connect to the database");
		console.log("ERROR");
	});
