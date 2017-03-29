let loginButton = $(".login-wrapper > button"),
	loginInput = $(".login-wrapper > .login"),
	passwordInput = $(".login-wrapper > .password"),
	loginWarningField = $(".login-wrapper > .warning-login"),
	defaultDelay = 5000;

$(loginButton).click(doLogin);

let validateLogin = (resolve, reject) => {
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
		.then((data) => resolve(data, login, password), (jqXHR, textStatus, errorThrown) => writeWarning(errorThrown))
};

let doLogin = () => {
	(new Promise(validateLogin))
		.then(searchLogin, (el) => $(el).removeClass('error'))
};

let writeWarning = (text, delayToDisappear) => {
	$(loginWarningField).text(text).removeClass('deactivated');
	setTimeout(() => $(loginWarningField).addClass('deactivated'), delayToDisappear || defaultDelay);
};

let searchLogin = (jsonText, login, password) => {
	let db = JSON.parse(jsonText);
	(db.users.filter((user) => user.login == login && user.password == password).length || writeWarning("Incorrect login or password."));
}
