// import { expect } from "@wdio/globals";
// import StoreFront from "../pageobjects/storefront.page.js";
// import CheckoutPage from "../pageobjects/checkoutForm.page.js";
// import * as userAddressData from "../data/userAddress.json";
// import * as cardData from "../data/cardData.json";
// import allureReporter from "@wdio/allure-reporter";

// /**
//  * Test suite for verifying the end-to-end checkout process on the Storefront
//  */
// describe("Checkout Cookie", () => {
//   /**
//    * Runs before each test:
//    * - Opens the storefront page
//    */
//   beforeEach(async () => {
//     await StoreFront.open();
//   });

//   /**
//    * Test Case: Verify user is able to place an order on the Storefront
//    * Steps:
//    * - Select cookie quantities
//    * - Proceed to checkout
//    * - Fill shipping and contact details
//    * - Select delivery method and order preferences
//    * - Enter card details within iframes
//    * - Place the order
//    * Expected Result:
//    * - User should see a confirmation message after placing the order
//    */
//   it("Verify user is able to place Order on Storefront", async () => {
//     allureReporter.addFeature("Checkout Storefront"); // Add feature to report
//     allureReporter.addStory("User can perform checkout");
//     // Set product quantities
//     await StoreFront.setThinkMintsQuantity(2);
//     await StoreFront.setPeanuButterQuantity(4);
//     allureReporter.addStep(
//       'Add "Thin Mints" and "Peanut Butter Sandwiches" Quantities'
//     );

//     // Verify delivery option is visible
//     expect(StoreFront.inPersonDelivery).toBeDisplayed();
//     allureReporter.addStep("Validate the delivery option is visible");

//     // Proceed to checkout
//     await StoreFront.clickCheckout();
//     allureReporter.addStep("Click on Checkout button");

//     // Fill in checkout form with user data
//     await CheckoutPage.fillCheckoutForm(
//       userAddressData.firstName,
//       userAddressData.lastName,
//       userAddressData.address1,
//       userAddressData.address2,
//       userAddressData.city,
//       userAddressData.state,
//       userAddressData.zip,
//       userAddressData.phone,
//       userAddressData.email
//     );
//     allureReporter.addStep("Fill in checkout form with user data");

//     // Continue through checkout steps
//     await CheckoutPage.continueDetails();
//     await CheckoutPage.clickDeliverToAddress();
//     await CheckoutPage.clickDonateCookieCheckbox();
//     await CheckoutPage.clickOrderPreferenceContinue();
//     await CheckoutPage.clickConnectWithGSContinue();
//     allureReporter.addStep("Continue through checkout steps");

//     // Enter payment details using iframes
//     await CheckoutPage.enterCardDetails(
//       cardData.cardHolderName,
//       cardData.cardNumber,
//       cardData.cardExpiration,
//       cardData.cardCvv
//     );
//     allureReporter.addStep("Enter payment details using iframes");

//     // Scroll to and verify "Place Order" button
//     await CheckoutPage.placeOrderBtn.scrollIntoView();
//     await browser.pause(2000);
//     expect(CheckoutPage.placeOrderBtn).toBeDisplayed();
//     allureReporter.addStep("Verify 'Place Order' button is displayed");

//     // Place the order
//     await CheckoutPage.clickPlaceOrder();
//     allureReporter.addStep("Click on 'Place Order' button");

//     // Verify order confirmation message is displayed
//     expect(CheckoutPage.orderConfirmationMessage).toBeDisplayed();
//     allureReporter.addStep("Verify order confirmation message is displayed");
//   });
// });
