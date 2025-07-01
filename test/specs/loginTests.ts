import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import * as loginData from "../data/login/loginData.json";

describe("Login", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("Verify login with valid credentials", async () => {
    await LoginPage.login(loginData.validEmail, loginData.validPassword);
    await expect(browser).toHaveUrl(
      expect.stringContaining("/national/national-dashboard")
    );
  });

  it("Verify that Email and Password are mandatory", async () => {
    await LoginPage.btnLogin.click();
    await expect(LoginPage.loginMandatoryValidation).toBeDisplayed();
  });

  it("Verify that login with invalid credentials are not allowed", async () => {
    await LoginPage.login(loginData.invalidEmail, loginData.invalidPassword);
    await LoginPage.btnLogin.click();
    await expect(browser).toHaveUrl(expect.stringContaining("/login"));
  });
});
