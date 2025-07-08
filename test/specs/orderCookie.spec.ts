import { expect } from "@wdio/globals";
import StoreFront from "../pageobjects/storefront.page.js";
import CheckoutPage from "../pageobjects/checkoutForm.page.js";
import * as userAddressData from "../data/userAddress.json";
import * as cardData from "../data/cardData.json";

describe("Checkout Cookie", () => {
  beforeEach(async () => {
    await StoreFront.open();
  });

  it("Verify user is able to place Order on Storefront", async () => {
    await StoreFront.setThinkMintsQuantity(2);
    await StoreFront.setPeanuButterQuantity(4);
    expect(StoreFront.inPersonDelivery).toBeDisplayed();
    await StoreFront.clickCheckout();
    await CheckoutPage.fillCheckoutForm(
      userAddressData.firstName,
      userAddressData.lastName,
      userAddressData.address1,
      userAddressData.address2,
      userAddressData.city,
      userAddressData.state,
      userAddressData.zip,
      userAddressData.phone,
      userAddressData.email
    );
    await CheckoutPage.continueDetails();
    await CheckoutPage.clickDeliverToAddress();
    await CheckoutPage.clickDonateCookieCheckbox();
    await CheckoutPage.clickOrderPreferenceContinue();
    await CheckoutPage.clickConnectWithGSContinue();
    await CheckoutPage.enterCardDetails(
      cardData.cardHolderName,
      cardData.cardNumber,
      cardData.cardExpiration,
      cardData.cardCvv
    );
    await CheckoutPage.placeOrderBtn.scrollIntoView();
    await browser.pause(2000);
    expect(CheckoutPage.placeOrderBtn).toBeDisplayed();
    await CheckoutPage.clickPlaceOrder();
    expect(CheckoutPage.orderConfirmationMessage).toBeDisplayed();
  });
});
