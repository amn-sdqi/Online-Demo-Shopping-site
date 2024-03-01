const User = require("../models/user.models");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
	res.render("customer/auth/signup");
}

async function signup(req, res, next) {
	const enteredData = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.fullname,
		street: req.body.street,
		postal: req.body.postal,
		city: req.body.city,
	};

	if (
		!validation.userDetailsValid(
			req.body.email,
			req.body.password,
			req.body.fullname,
			req.body.street,
			req.body.postal,
			req.body.city
		) ||
		!validation.emailIsConfrim(req.body.email, req.body.confirm_email)
	) {
		sessionFlash.flashDataToSession(
			req,
			{ errorMessage: "Please check your input", ...enteredData },
			function () {
				res.redirect("/signup");
			}
		);
		return;
	}

	const user = new User(
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.street,
		req.body.postal,
		req.body.city
	);

	try {
		const existingUser = await user.existingUser();
		if (existingUser) {
			sessionFlash.flashDataToSession(
				req,
				{
					errorMessage: "User exists already! ,try logging in instead",
					...enteredData,
				},
				function () {
					res.redirect("/signup");
				}
			);
			return;
		}

		await user.signup();
	} catch (error) {
		next(error);
		return;
	}

	res.redirect("/login");
}

function getLogin(req, res) {
	res.render("customer/auth/login");
}

async function login(req, res, next) {
	const user = new User(req.body.email, req.body.password);
	let existingUser;

	try {
		existingUser = await user.getUserWithSameEmail();
	} catch (error) {
		next(error);
		return;
	}

	if (!existingUser) {
		sessionFlash.flashDataToSession(
			req,
			{
				errorMessage: "Incorrrect User",
				email: req.body.email,
				password: req.body.password,
			},
			function () {
				res.redirect("/login");
			}
		);
		return;
	}

	const passwordIsCorrect = await user.hasMatchingPassword(
		existingUser.password
	);

	if (!passwordIsCorrect) {
		sessionFlash.flashDataToSession(
			req,
			{
				errorMessage: "Incorrrect password",
				email: req.body.email,
				password: req.body.password,
			},
			function () {
				res.redirect("/login");
			}
		);
		return;
	}

	authUtil.createUserSission(req, existingUser, function () {
		res.redirect("/");
	});
}

function logout(req, res) {
	authUtil.destroyUserSession(req);
	res.redirect("/login");
}

module.exports = {
	getSignup: getSignup,
	getLogin: getLogin,
	signup: signup,
	login: login,
	logout: logout,
};
