import { $ } from "@wdio/globals";
import Page from "../core/page.js";

class LoginPage extends Page {
  public get requestRegistrationEmailLink() {
    return $("=> Request a registration email");
  }

  public get registerEmailInput() {
    return $("#registeremail");
  }

  public get registerEmailSubmitButton() {
    return $("#registerEmailSubmit");
  }
}

export default new LoginPage();
