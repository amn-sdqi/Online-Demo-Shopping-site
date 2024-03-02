function createUserSission(req, user, action) {
	req.session.uid = user._id.toString();
	req.session.isAdmin = user.isAdmin;
	req.session.save(action);
}

function destroyUserSession(req) {
	req.session.uid = null;
}

module.exports = {
	createUserSission: createUserSission,
	destroyUserSession: destroyUserSession,
};
