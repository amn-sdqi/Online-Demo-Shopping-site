function getSessionData() {
	const sessionData = req.session.flashData;

	req.session.flashData = null;

	return sessionData;
}

function flashDataToSession(req, res, data, action) {
	req.session.flashedData = data;
	req.session.save(action);
}

module.exports = {
	getSessionData: getSessionData,
	flashDataToSession: flashDataToSession,
};
