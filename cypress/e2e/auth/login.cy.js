import LoginPage from "../../pages/LoginPage";

const adminEmail = Cypress.env("ADMIN_EMAIL") || "john@example.com";
const adminPassword = Cypress.env("ADMIN_PASSWORD") || "StrongPass123!";

describe("User Login", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("logs in with valid credentials", () => {
    LoginPage.visit();
    LoginPage.login(adminEmail, adminPassword);
    cy.location("pathname", { timeout: 5000 }).should("eq", "/");
  });

  it("shows error for invalid credentials", () => {
    LoginPage.visit();
    LoginPage.login(adminEmail, "WrongPassword123!");
    LoginPage.errorMessage().should("be.visible");
  });
});

describe("Auth State", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("persists token in localStorage after login", () => {
    LoginPage.visit();
    LoginPage.login(adminEmail, adminPassword);
    cy.location("pathname", { timeout: 5000 }).should("eq", "/");

    cy.window().then((win) => {
      const raw = win.localStorage.getItem("user");
      expect(raw).to.include("authToken");
    });
  });

  it("redirects unauthenticated users to login", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });

  it("keeps session after reload", () => {
    LoginPage.visit();
    LoginPage.login(adminEmail, adminPassword);
    cy.location("pathname", { timeout: 5000 }).should("eq", "/");

    cy.reload();
    cy.location("pathname").should("eq", "/");
  });

  it("logs out and clears auth state", () => {
    LoginPage.visit();
    LoginPage.login(adminEmail, adminPassword);
    cy.location("pathname", { timeout: 5000 }).should("eq", "/");

    cy.getByTestId("logout-button").click();
    cy.location("pathname").should("eq", "/login");
    cy.window().then((win) => {
      const raw = win.localStorage.getItem("user");
      expect(raw).to.be.a("string");
      const parsed = JSON.parse(raw);
      expect(parsed.state.user).to.be.null;
    });
  });
});
