import { expect } from "@wdio/globals";
import LoginPage from "../../pageobjects/login-pages/login.page.js";
import { routes } from "../../common/routes.js";
import * as loginData from "../../data/login-data/loginData.json";

/**
 * Test suite for verifying login functionality on the application
 */
describe("Login Tests", () => {
  /**
   * Runs before each test - opens the login page
   */
  beforeEach(async () => {
    await LoginPage.open();
  });

  /**
   * Test Case: Verify login with valid credentials
   * Expected Result: User is redirected to the national dashboard page
   */
  it("Verify login with valid credentials", async () => {
    await LoginPage.login(loginData.validEmail, loginData.validPassword);
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.dashboard.national)
    );
  });

  /**
   * Test Case: Verify mandatory validation for Email and Password fields
   * Expected Result: Error message is displayed when both fields are left empty
   */
  it("Verify that Email and Password are mandatory", async () => {
    await LoginPage.btnLogin.click();
    await expect(LoginPage.loginMandatoryValidation).toBeDisplayed();
  });

  /**
   * Test Case: Verify login fails with invalid credentials
   * Expected Result: User remains on the login page with no redirection
   */
  it("Verify that login with invalid credentials are not allowed", async () => {
    await LoginPage.login(loginData.invalidEmail, loginData.invalidPassword);
    await LoginPage.btnLogin.click();
    await expect(browser).toHaveUrl(expect.stringContaining(routes.auth.login));
  });
});
