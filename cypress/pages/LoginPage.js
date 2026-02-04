class LoginPage {
  visit() {
    cy.visit("/login");
  }

  emailInput() {
    return cy.getByTestId("login-email");
  }

  passwordInput() {
    return cy.getByTestId("login-password");
  }

  submitButton() {
    return cy.getByTestId("login-submit");
  }

  errorMessage() {
    return cy.getByTestId("login-error");
  }

  successMessage() {
    return cy.getByTestId("login-success");
  }

  login(email, password) {
    this.emailInput().clear().type(email);
    this.passwordInput().clear().type(password, { log: false });
    this.submitButton().click();
  }
}

export default new LoginPage();
