const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
	const MongoDbStore = mongoDbStore(expressSession);

	const store = new MongoDbStore({
		uri: "mongodb://127.0.0.1",
		databaseName: "online-store",
		collection: "session",
	});

	return store;
}

function createSessionConfig() {
	return {
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		store: createSessionStore(),
		cookie: {
			maxAge: 2 * 24 * 60 * 60 * 1000,
		},
	};
}

module.exports = createSessionConfig;
