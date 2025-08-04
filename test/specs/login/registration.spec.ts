import { expect } from "@wdio/globals";
import LoginPage from "../../pageobjects/login/login.page.js";
import RegistrationPage from "../../pageobjects/login/registration.page.js";
import * as registrationData from "../../data/login/registrationData.json";

describe("Registration", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("Verify that the user is able to access the request for registeration email link", async () => {
    await LoginPage.needHelpToLoginLink.click();
    await RegistrationPage.requestRegistrationEmailLink.click();
    await expect(browser).toHaveUrl(expect.stringContaining("/login-help"));
    await expect(RegistrationPage.registerEmailInput).toBeDisplayed();
    await expect(RegistrationPage.registerEmailSubmitButton).toBeDisplayed();
    await expect(browser).toHaveUrl(expect.stringContaining("/registeremail"));
  });

  it("Verify that user is not able to submit the Request a Digital Cookie Registration Email when council has not started the process", async () => {
    await LoginPage.needHelpToLoginLink.click();
    await RegistrationPage.requestRegistrationEmailLink.click();
    await RegistrationPage.registerEmailInput.waitForClickable();
    await RegistrationPage.registerEmailInput.setValue(
      registrationData.registrationEmail
    );
    await RegistrationPage.registerEmailSubmitButton.click();
    const errorElement = $(
      '//*[contains(text(), "' + registrationData.councilNotStartError + '")]'
    );
    await expect(errorElement).toBeDisplayed();
  });
});
