const mongodb = require("mongodb");


const MongoClient = mongodb.MongoClient;

let database;

async function connect_database() {
	const client = await MongoClient.connect("mongodb://127.0.0.1");
	database = client.db("online-shop");
}

function getDb() {
	if (!database) {
		throw new Error("You must connect to the Database");
	}

	return database;
}

module.exports = {
	connect_database: connect_database,
	getDb: getDb,
};
