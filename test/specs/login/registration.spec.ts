import { expect } from "@wdio/globals";
import LoginPage from "../../pageobjects/login-pages/login.page.js";
import RegistrationPage from "../../pageobjects/login-pages/registration.page.js";
import { selectors } from "../../common/selectors.js";
import { errorMessages } from "../../common/errorMessages.js";
import { successMessages } from "../../common/successMessages.js";
import { routes } from "../../common/routes.js";
import { loadEnvBasedData } from "../../utils/envUtils.js";
import BasePage from "../../pageobjects/core/basepage.js";

let registrationData: any;

const registrationSuccessMessage = successMessages.registration.confirmation;

describe("Registration Tests @registration", () => {
  before(async () => {
    registrationData = loadEnvBasedData("login-data/registrationData.json");
  });

  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.needHelpToLoginLink.click();
  });

  it("Verify that the user is able to access the request for registration email link @smoke @regression", async () => {
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.auth.loginHelp)
    );
    await RegistrationPage.requestRegistrationEmailLink.click();
    await expect(RegistrationPage.registerEmailInput).toBeDisplayed();
    await expect(selectors.submitButton).toBeDisplayed();
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.auth.registration)
    );
  });

  it("Verify that user is not able to submit request when council has not started the process @regression", async () => {
    await RegistrationPage.requestRegistrationEmailLink.click();
    await RegistrationPage.registerEmailInput.waitForClickable();
    await RegistrationPage.registerEmailInput.setValue(
      registrationData.invalidRegistrationEmail
    );
    await selectors.submitButton.click();
    const errorElement = $(
      `//*[contains(text(), "${errorMessages.registration.councilNotStarted}")]`
    );
    await expect(errorElement).toBeDisplayed();
  });

  it("Verify that user is able to submit the registration request @smoke @regression", async () => {
    await RegistrationPage.requestRegistrationEmailLink.click();
    await RegistrationPage.registerEmailInput.waitForClickable();
    await RegistrationPage.registerEmailInput.setValue(
      registrationData.validRegistrationEmail
    );
    await selectors.submitButton.click();
    await BasePage.expectMessageAppeared(registrationSuccessMessage);
  });
});
