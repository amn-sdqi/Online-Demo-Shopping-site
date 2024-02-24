function createUserSission(req, user, action) {
	req.session.uid = user._id.toString();
	req.session.save(action);
}

module.exports = {
	createUserSission: createUserSission,
};
