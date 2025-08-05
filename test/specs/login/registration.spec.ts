import { expect } from "@wdio/globals";
import LoginPage from "../../pageobjects/login/login.page.js";
import RegistrationPage from "../../pageobjects/login/registration.page.js";
import { selectors } from "../../common/selectors.js";
import { errorMessages } from "../../common/errorMessages.js";
import { routes } from "../../common/routes.js";
import * as registrationData from "../../data/login/registrationData.json";

describe("Registration Tests", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.needHelpToLoginLink.click();
    await RegistrationPage.requestRegistrationEmailLink.click();
  });

  it("Verify that the user is able to access the request for registeration email link", async () => {
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.auth.loginHelp)
    );
    await expect(RegistrationPage.registerEmailInput).toBeDisplayed();
    await expect(selectors.submitButton).toBeDisplayed();
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.auth.registration)
    );
  });

  it("Verify that user is not able to submit the Request a Digital Cookie Registration Email when council has not started the process", async () => {
    await RegistrationPage.registerEmailInput.waitForClickable();
    await RegistrationPage.registerEmailInput.setValue(
      registrationData.registrationEmail
    );
    await selectors.submitButton.click();
    const errorElement = $(
      '//*[contains(text(), "' +
        errorMessages.registration.councilNotStarted +
        '")]'
    );
    await expect(errorElement).toBeDisplayed();
  });
});
