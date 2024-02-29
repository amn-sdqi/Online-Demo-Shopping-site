function isEmpty(value) {
	return !value || value.trim() === "";
}

function userDetailsValid(email, password, name, street, postal, city) {
	return (
		email &&
		email.includes("@") &&
		password &&
		password.trim().lenght > 5 &&
		isEmpty(name) &&
		isEmpty(street) &&
		isEmpty(postal) &&
		isEmpty(city)
	);
}

function emailIsConfrim(email, confirm_email) {
	return email === confirm_email;
}

module.exports = {
	userDetailsValid: userDetailsValid,
	emailIsConfrim: emailIsConfrim,
};
