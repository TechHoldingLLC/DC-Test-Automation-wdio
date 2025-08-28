import { expect } from "@wdio/globals";
import LoginPage from "../../pageobjects/login-pages/login.page.js";
import { routes } from "../../common/routes.js";
import { selectors } from "../../common/selectors.js";
import { errorMessages } from "../../common/errorMessages.js";
import { successMessages } from "../../common/successMessages.js";
import ForgotPasswordPage from "../../pageobjects/login-pages/forgotPassword.page.js";
import * as forgotPasswordData from "../../data/login-data/forgotPasswordData.json";

describe("Forgot Password Tests", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.forgotPasswordLink.click();
  });

  it("Verify that user can access forgot password link", async () => {
    await selectors.emailInput.waitForDisplayed();
    await expect(browser).toHaveUrl(
      expect.stringContaining(routes.auth.forgotPassword)
    );
  });

  it("Verify that Email is mandatory field on Forgot Password page", async () => {
    await selectors.submitButton.waitForClickable();
    await selectors.submitButton.click();
    const errorElement = $(
      '//*[contains(text(), "' + errorMessages.common.invalidEmail + '")]'
    );
    await expect(errorElement).toBeDisplayed();
  });

  it("Verify that Invalid email is not accepted on Forgot Password page", async () => {
    await ForgotPasswordPage.requestPasswordReset(
      forgotPasswordData.invalidEmail
    );
    const errorElement = $(
      '//*[contains(text(), "' + errorMessages.common.invalidEmail + '")]'
    );
    await expect(errorElement).toBeDisplayed();
  });

  it("Verify that Valid email is accepted on Forgot Password page", async () => {
    await ForgotPasswordPage.requestPasswordReset(
      forgotPasswordData.validEmail
    );
    const successElement = $(
      '//*[contains(text(), "' +
        successMessages.forgotPassword.emailSent +
        '")]'
    );
    await expect(successElement).toBeDisplayed();
  });
});
