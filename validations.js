let loginButton,
	loginInput,
	passwordInput,
	loginWarningField,
	validateLogin,
	doLogin,
	writeWarning,
	searchLogin,
	defaultDelay = 5000;

window.onload = () => {
	loginButton = $(".login-wrapper > button");
	loginInput = $(".login-wrapper > .login");
	passwordInput = $(".login-wrapper > .password");
	loginWarningField = $(".login-wrapper > .warning-login");
	$(loginButton).click(doLogin);
};

validateLogin = (resolve, reject) => {
	let login = $(loginInput).val(),
		password = $(passwordInput).val();

	if (!login) {
		(!$(loginInput).hasClass("error") && $(loginInput).addClass('error'));
		setTimeout(() => reject(loginInput), defaultDelay);
	}

	if (!password) {
		(!$(passwordInput).hasClass("error") && $(passwordInput).addClass('error'));
		setTimeout(() => reject(passwordInput), defaultDelay);
	}

	$.get("login-db.json")
		.then(
			(data) => resolve({ db: data, login: login, password: password }),
			(jqXHR, textStatus, errorThrown) => writeWarning(errorThrown)
		);
};

doLogin = () => {
	(new Promise(validateLogin))
		.then(searchLogin, (el) => $(el).removeClass('error'))
};

writeWarning = function (text, delayToDisappear) {
	$(loginWarningField).text(text).removeClass('deactivated');
	setTimeout(() => $(loginWarningField).addClass('deactivated'), delayToDisappear || defaultDelay);
};

searchLogin = function (args) {
	if (args.db.users.filter((user) => user.login == args.login && user.password == args.password).length)
		alert("Success!");
	else
		writeWarning("Incorrect login or password.");
}
