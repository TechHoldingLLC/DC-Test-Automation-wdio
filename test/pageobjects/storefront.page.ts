import { $ } from "@wdio/globals";
import Page from "./page.js";
import { isMobileView } from "../utils/viewUtils.js";

class StroreFront extends Page {
  // Element getters for cookies and delivery options
  public get acceptCookies() {
    return $("#acceptAllCookieButton");
  }
  public get thinkMintsCookie() {
    return $("#cookie1Input");
  }
  public get peanutButterSandwichCookie() {
    return $("#cookie7Input");
  }
  public get toastYayCookie() {
    return $("#cookie8Input");
  }

  public get shipCookiesOption() {
    return $("#ship-the-cookies");
  }
  public get inPersonDeliveryOption() {
    return $("#in-person");
  }
  public get inPersonDelivery() {
    return $("#delivery-method-in-person");
  }

  public get calculateBtn() {
    return $("#recalculate");
  }
  public get checkoutBtn() {
    return $('//*[@class="checkout enabled"]');
  }

  public get thinkMintsIncrementBtn() {
    return $('(//*[text()="+"])[1]');
  }
  public get peanutButterIncrementBtn() {
    return $('(//*[text()="+"])[7]');
  }

  /**
   * Clicks the Checkout button to proceed with the order
   */
  public async clickCheckout() {
    await this.checkoutBtn.click();
  }

  /**
   * Sets the quantity of Thin Mints cookies.
   * Uses `+` button on mobile or sets value directly on desktop.
   */
  public async setThinkMintsQuantity(quantity: number) {
    if (await isMobileView()) {
      const plusButton = $("#cookie1_inc");
      await plusButton.waitForDisplayed({ timeout: 5000 });
      for (let i = 0; i < quantity; i++) {
        await plusButton.click();
      }
    } else {
      const input = $("#cookie1Input");
      await input.waitForDisplayed({ timeout: 5000 });
      await input.setValue(quantity.toString());
    }
  }

  /**
   * Sets the quantity of Peanut Butter Sandwich cookies.
   * Uses `+` button on mobile or sets value directly on desktop.
   */
  public async setPeanuButterQuantity(quantity: number) {
    if (await isMobileView()) {
      const plusButton = $("#cookie7_inc");
      await plusButton.waitForDisplayed({ timeout: 5000 });
      for (let i = 0; i < quantity; i++) {
        await plusButton.click();
      }
    } else {
      const input = $("#cookie7Input");
      await input.waitForDisplayed({ timeout: 5000 });
      await input.setValue(quantity.toString());
    }
  }

  /**
   * Selects the in-person delivery option on the shipping method screen
   */
  public async selectInPersonDeliveryOption() {
    await this.inPersonDeliveryOption.click();
  }

  /**
   * Opens the StoreFront page with a specific scout ID
   */
  public async open() {
    if (await isMobileView()) {
      return super.open("scout/ssbsbs691940");
    } else {
      await browser.maximizeWindow();
      return super.open("scout/ssbsbs691940?mobile=true");
    }
  }
}

export default new StroreFront();
