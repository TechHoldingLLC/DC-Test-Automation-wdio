import { $ } from "@wdio/globals";
import Page from "../core/page.js";

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
  public async login(username: string, password: string) {
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  /**
   * Opens the login page by navigating to the 'login' route
   */
  public open() {
    return super.open("login");
  }
}

export default new LoginPage();
