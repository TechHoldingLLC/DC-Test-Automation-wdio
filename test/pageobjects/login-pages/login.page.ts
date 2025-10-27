import { $ } from "@wdio/globals";
import Page from "../core/page.js";
import * as loginData from "../../data/login-data/loginData.json";
import * as dotenv from "dotenv";

dotenv.config();

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
   * Returns the password to use: first from .env (DC_LOGIN_PASSWORD_LOCAL), fallback to GitHub Secrets (DC_LOGIN_PASSWORD_GITHUB)
   */
  public getPassword(): string {
    const password =
      process.env.DC_LOGIN_PASSWORD_LOCAL ||
      process.env.DC_LOGIN_PASSWORD_GITHUB;
    if (!password) {
      throw new Error(
        "Missing password. Please set DC_LOGIN_PASSWORD_LOCAL in .env or DC_LOGIN_PASSWORD_GITHUB in GitHub Secrets."
      );
    }
    return password;
  }

  /**
   * Logs in with provided username and password.
   * If password is not provided, uses getPassword()
   */
  public async login(
    username: string = loginData.validEmail,
    password?: string
  ) {
    const pwd = password || this.getPassword();
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(pwd);
    await this.btnLogin.click();
  }

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

  public open() {
    return super.open("login");
  }
}

export default new LoginPage();
