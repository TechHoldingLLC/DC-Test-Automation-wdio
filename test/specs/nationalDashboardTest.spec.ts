import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import NationalDashboard from "../pageobjects/nationalDashboard.page.js";
import * as loginData from "../data/login/loginData.json";

describe("National Dashboard", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(loginData.validEmail, loginData.validPassword);
  });

  it("Verify that 'Total Digital Sales' chart is available on national dashboard", async () => {
    await NationalDashboard.dashboardHeader.waitForDisplayed();
    await expect(NationalDashboard.totalDigitalSalesChart).toBeDisplayed();
  });

  it("Verify that 'Online Sales by Cookie' chart is available on national dashboard", async () => {
    await NationalDashboard.dashboardHeader.waitForDisplayed();
    await expect(NationalDashboard.onlineSalesByCookieChart).toBeDisplayed();
  });
});
