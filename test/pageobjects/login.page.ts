import { $ } from "@wdio/globals";
import Page from "./page.js";

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

  public async login(username: string, password: string) {
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  public open() {
    return super.open("login");
  }
}

export default new LoginPage();
