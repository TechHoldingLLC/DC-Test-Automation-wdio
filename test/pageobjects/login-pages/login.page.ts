import { $ } from "@wdio/globals";
import Page from "../core/page.js";
import * as loginData from "../../data/login-data/loginData.json";

class LoginPage extends Page {
  public get inputEmail() {
    return $("#username");
  }

  public get inputPassword() {
    return $("#password");
  }

  public get btnLogin() {
    return $("#loginButton");
  }

  public get btnLogout() {
    return $("#logout");
  }

  public get loginMandatoryValidation() {
    return $(
      "span=The email or password entered is incorrect. Please try again."
    );
  }

  public get needHelpToLoginLink() {
    return $("=Need help to log in");
  }

  public get forgotPasswordLink() {
    return $("=Forgot password");
  }

  /**
   * Logs in with provided username and password.
   */
  public async login(
    username: string = loginData.validEmail,
    password: string = loginData.validPassword
  ) {
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  /**
   * Logs out the current user by clicking the logout button
   */
  public async logout() {
    await this.btnLogout.waitForClickable();
    await this.btnLogout.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("login"),
      {
        timeout: 5000,
        timeoutMsg: "Expected URL to contain 'login' after logout",
      }
    );
  }

  /**
   * Opens the login page by navigating to the 'login' route
   */
  public open() {
    return super.open("login");
  }
}

export default new LoginPage();
