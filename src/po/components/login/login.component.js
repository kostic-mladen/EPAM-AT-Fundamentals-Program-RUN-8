class LoginComponent {
    // CSS — targets the username input by its data-test attribute
    get usernameInput() {
        return $('[data-test="username"]');
    }

    // XPath — targets the password input by its data-test attribute
    get passwordInput() {
        return $('//input[@data-test="password"]');
    }

    // CSS — targets the login button by its data-test attribute
    get loginButton() {
        return $('[data-test="login-button"]');
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginComponent();
