class RegisterPage {
  visit() {
    cy.visit("/register");
  }

  nameInput() {
    return cy.getByTestId("register-name");
  }

  emailInput() {
    return cy.getByTestId("register-email");
  }

  passwordInput() {
    return cy.getByTestId("register-password");
  }

  confirmPasswordInput() {
    return cy.getByTestId("register-confirm-password");
  }

  submitButton() {
    return cy.getByTestId("register-submit");
  }

  errorMessage() {
    return cy.getByTestId("register-error");
  }

  successMessage() {
    return cy.getByTestId("register-success");
  }

  register({ name, email, password, confirmPassword }) {
    this.nameInput().clear().type(name);
    this.emailInput().clear().type(email);
    this.passwordInput().clear().type(password, { log: false });
    this.confirmPasswordInput().clear().type(confirmPassword, { log: false });
    this.submitButton().click();
  }
}

export default new RegisterPage();
