// Login form component — reusable across any test that requires authentication
class LoginComponent {
    // CSS — data-test attribute selector for the username input
    get usernameInput() {
        return $('[data-test="username"]');
    }

    // XPath — locate password input by its data-test attribute
    get passwordInput() {
        return $('//input[@data-test="password"]');
    }

    // CSS — data-test attribute selector for the login button
    get loginButton() {
        return $('[data-test="login-button"]');
    }

    // Fills in credentials and submits the login form
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginComponent();
