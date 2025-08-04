import { $ } from "@wdio/globals";
import Page from "../page.js";

class LoginPage extends Page {
  // Getter for email input field
  public get inputEmail() {
    return $("#username");
  }

  // Getter for password input field
  public get inputPassword() {
    return $("#password");
  }

  // Getter for login button
  public get btnLogin() {
    return $("#loginButton");
  }

  // Getter for login error validation message
  public get loginMandatoryValidation() {
    return $(
      "span=The email or password entered is incorrect. Please try again."
    );
  }

  public get needHelpToLoginLink() {
    return $("=Need help to log in");
  }

  /**
   * Logs in with provided username and password.
   * @param username - User email/username
   * @param password - User password
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
