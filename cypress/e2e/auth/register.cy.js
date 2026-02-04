import RegisterPage from "../../pages/RegisterPage";

const createUser = () => {
  const runId = Date.now();
  return {
    name: `QA User ${String(runId).slice(-6)}`,
    email: `qa.user.${runId}@example.com`,
    password: "StrongPass123!",
    confirmPassword: "StrongPass123!",
  };
};

describe("User Registration", () => {
  it("registers a new user with valid data", () => {
    const user = createUser();
    RegisterPage.visit();
    RegisterPage.register(user);

    RegisterPage.successMessage().should("be.visible");
    cy.location("pathname", { timeout: 5000 }).should("eq", "/login");
  });

  it("shows validation error for missing fields", () => {
    RegisterPage.visit();
    RegisterPage.submitButton().click();
    RegisterPage.errorMessage().should("contain.text", "All fields are required");
  });

  it("shows validation error for mismatched passwords", () => {
    const user = createUser();
    RegisterPage.visit();
    RegisterPage.register({
      ...user,
      confirmPassword: "Mismatch123!",
    });
    RegisterPage.errorMessage().should("contain.text", "Passwords do not match");
  });
});
