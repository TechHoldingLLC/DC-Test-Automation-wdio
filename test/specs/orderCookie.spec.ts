import { expect } from "@wdio/globals";
import StoreFront from "../pageobjects/storefront.page.js";
import CheckoutPage from "../pageobjects/checkoutForm.page.js";
import * as userAddressData from "../data/userAddress.json";
import * as cardData from "../data/cardData.json";

/**
 * Test suite for verifying the end-to-end checkout process on the Storefront
 */
describe("Checkout Cookie", () => {
  /**
   * Runs before each test:
   * - Opens the storefront page
   */
  beforeEach(async () => {
    await StoreFront.open();
  });

  /**
   * Test Case: Verify user is able to place an order on the Storefront
   * Steps:
   * - Select cookie quantities
   * - Proceed to checkout
   * - Fill shipping and contact details
   * - Select delivery method and order preferences
   * - Enter card details within iframes
   * - Place the order
   * Expected Result:
   * - User should see a confirmation message after placing the order
   */
  it("Verify user is able to place Order on Storefront", async () => {
    // Set product quantities
    await StoreFront.setThinkMintsQuantity(2);
    await StoreFront.setPeanuButterQuantity(4);

    // Verify delivery option is visible
    expect(StoreFront.inPersonDelivery).toBeDisplayed();

    // Proceed to checkout
    await StoreFront.clickCheckout();

    // Fill in checkout form with user data
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

    // Continue through checkout steps
    await CheckoutPage.continueDetails();
    await CheckoutPage.clickDeliverToAddress();
    await CheckoutPage.clickDonateCookieCheckbox();
    await CheckoutPage.clickOrderPreferenceContinue();
    await CheckoutPage.clickConnectWithGSContinue();

    // Enter payment details using iframes
    await CheckoutPage.enterCardDetails(
      cardData.cardHolderName,
      cardData.cardNumber,
      cardData.cardExpiration,
      cardData.cardCvv
    );

    // Scroll to and verify "Place Order" button
    await CheckoutPage.placeOrderBtn.scrollIntoView();
    await browser.pause(2000);
    expect(CheckoutPage.placeOrderBtn).toBeDisplayed();

    // Place the order
    await CheckoutPage.clickPlaceOrder();

    // Verify order confirmation message is displayed
    expect(CheckoutPage.orderConfirmationMessage).toBeDisplayed();
  });
});
