import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login/login.page.js";
import NationalDashboard from "../pageobjects/nationalDashboard.page.js";
import * as loginData from "../data/login/loginData.json";

/**
 * Test suite for verifying elements and charts displayed on the National Dashboard
 */
describe("National Dashboard", () => {
  /**
   * Runs before each test:
   * - Opens the login page
   * - Logs in using valid credentials
   */
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(loginData.validEmail, loginData.validPassword);
  });

  /**
   * Test Case: Verify visibility of 'Total Digital Sales' chart on the dashboard
   * Expected Result: 'Total Digital Sales' chart should be displayed
   */
  it("Verify that 'Total Digital Sales' chart is available on national dashboard", async () => {
    await NationalDashboard.dashboardHeader.waitForDisplayed();
    await expect(NationalDashboard.totalDigitalSalesChart).toBeDisplayed();
  });

  /**
   * Test Case: Verify visibility of 'Online Sales by Cookie' chart on the dashboard
   * Expected Result: 'Online Sales by Cookie' chart should be displayed
   */
  it("Verify that 'Online Sales by Cookie' chart is available on national dashboard", async () => {
    await NationalDashboard.dashboardHeader.waitForDisplayed();
    await expect(NationalDashboard.onlineSalesByCookieChart).toBeDisplayed();
  });
});
