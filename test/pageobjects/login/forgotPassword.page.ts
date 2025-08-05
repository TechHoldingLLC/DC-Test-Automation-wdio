import Page from "../page.js";
import { selectors } from "../../common/selectors.js";

class ForgotPasswordPage extends Page {
  public async requestPasswordReset(email: string) {
    await selectors.emailInput.waitForClickable();
    await selectors.emailInput.setValue(email);
    await selectors.submitButton.click();
  }
}
export default new ForgotPasswordPage();
