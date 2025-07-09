import { $ } from "@wdio/globals";
import Page from "./page.js";

class CheckoutPage extends Page {
  // Form input getters
  public get inputFirstName() {
    return $("#firstName");
  }
  public get inputLastName() {
    return $("#lastName");
  }
  public get inputAddress1() {
    return $("#line1");
  }
  public get inputAddress2() {
    return $("#line2");
  }
  public get inputCity() {
    return $("#city");
  }
  public get inputState() {
    return $("#state");
  }
  public get inputZip() {
    return $("#zipCode");
  }
  public get inputPhone() {
    return $("#phone");
  }
  public get inputEmail() {
    return $("#email");
  }
  public get inputCardNumber() {
    return $("#cardNumber");
  }
  public get inputCardExpiration() {
    return $("#cardExpiration");
  }
  public get inputCardCvv() {
    return $("#cardCvv");
  }

  // Button and checkbox getters
  public get continueBtn() {
    return $('(//*[@class="btn enabled"])[1]');
  }
  public get deliverToAddressBtn() {
    return $("#continue");
  }
  public get donateCookieCheckbox() {
    return $("#alternateOption00");
  }
  public get orderPreferenceContinue() {
    return $("#orderPrefButton");
  }
  public get connectWithGSContinue() {
    return $("#girlScoutButton");
  }
  public get cardPaymentOptionSelection() {
    return $('//*[@class="braintree-option braintree-option__card"]');
  }

  // Iframe and iframe-input field getters for payment fields
  get cardholderNameFrame() {
    return $("#braintree-hosted-field-cardholderName");
  }
  get cardNumberFrame() {
    return $("#braintree-hosted-field-number");
  }
  get expirationDateFrame() {
    return $("#braintree-hosted-field-expirationDate");
  }
  get cvvFrame() {
    return $("#braintree-hosted-field-cvv");
  }

  get cardholderNameInput() {
    return $("#cardholder-name");
  }
  get cardNumberInput() {
    return $("#credit-card-number");
  }
  get expirationInput() {
    return $("#expiration");
  }
  get cvvInput() {
    return $("#cvv");
  }

  // Order confirmation and other UI elements
  public get getInTouch() {
    return $("//*[@class='in-case']");
  }
  public get placeOrderBtn() {
    return $("#placeOrderBtn");
  }
  public get orderConfirmationMessage() {
    return $("//*[text()='Thanks for your order!']");
  }
  public get reviewOrderText() {
    return $('//*[@class="row notify-message review-text-2 "]');
  }

  /**
   * Fill all fields in the checkout form (excluding payment details)
   */
  public async fillCheckoutForm(
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    email: string
  ) {
    await browser.waitUntil(
      async () => (await this.inputFirstName.isDisplayed()) === true,
      {
        timeout: 25000,
        timeoutMsg: "First name input is not displayed",
      }
    );
    await this.inputFirstName.click();
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputAddress1.setValue(address1);
    await this.inputAddress2.setValue(address2);
    await this.inputCity.setValue(city);
    await this.inputState.selectByVisibleText(state);
    await this.inputZip.setValue(zip);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await browser.pause(2000);
    await this.getInTouch.click();
  }

  /**
   * Clicks the Continue button after filling details
   */
  public async continueDetails() {
    await browser.waitUntil(
      async () => (await this.continueBtn.isDisplayed()) === true,
      {
        timeout: 5000,
        timeoutMsg: "Continue Button is not displayed",
      }
    );
    await this.continueBtn.waitForClickable();
    await this.continueBtn.scrollIntoView();
    await browser.pause(5000);
    await this.continueBtn.click();
  }

  /**
   * Clicks the "Deliver to this address" button
   */
  public async clickDeliverToAddress() {
    await this.deliverToAddressBtn.click();
  }

  /**
   * Clicks the donate cookie checkbox
   */
  public async clickDonateCookieCheckbox() {
    await this.donateCookieCheckbox.click();
  }

  /**
   * Clicks the continue button on Order Preference screen
   */
  public async clickOrderPreferenceContinue() {
    await this.orderPreferenceContinue.scrollIntoView();
    await this.orderPreferenceContinue.click();
  }

  /**
   * Clicks the continue button on Connect With Girl Scout screen
   */
  public async clickConnectWithGSContinue() {
    await this.connectWithGSContinue.scrollIntoView();
    await this.connectWithGSContinue.click();
  }

  /**
   * Enters credit card details by switching between payment iframes
   */
  async enterCardDetails(
    cardHolderName: string,
    cardNumber: string,
    cardExpiration: string,
    cardCvv: string
  ) {
    await this.cardPaymentOptionSelection.scrollIntoView({
      block: "center",
      inline: "center",
    });
    await this.cardPaymentOptionSelection.click();

    await this.cardholderNameFrame.waitForExist();
    await browser.switchFrame(this.cardholderNameFrame);
    await this.cardholderNameInput.setValue(cardHolderName);
    await browser.switchToParentFrame();

    await this.cardNumberFrame.waitForExist();
    await browser.switchFrame(this.cardNumberFrame);
    await this.cardNumberInput.setValue(cardNumber);
    await browser.switchToParentFrame();

    await this.expirationDateFrame.waitForExist();
    await browser.switchFrame(this.expirationDateFrame);
    await this.expirationInput.setValue(cardExpiration);
    await browser.switchToParentFrame();

    await this.cvvFrame.waitForExist();
    await browser.switchFrame(this.cvvFrame);
    await this.cvvInput.setValue(cardCvv);
    await browser.switchToParentFrame();
  }

  /**
   * Clicks on the Place Order button after reviewing the order
   */
  public async clickPlaceOrder() {
    await this.reviewOrderText.click();
    await browser.pause(2000);
    await browser.waitUntil(
      async () => (await this.placeOrderBtn.isDisplayed()) === true,
      {
        timeout: 5000,
        timeoutMsg: "Place Order Button is not displayed",
      }
    );
    await this.placeOrderBtn.scrollIntoView();
    await browser.pause(5000);
    await this.placeOrderBtn.click();
  }
}

export default new CheckoutPage();
