import CampaignSearchPage from "../../pageobjects/campaign-pages/campaignSearch.page.js";
import campaignDetailPage from "../../pageobjects/campaign-pages/campaignDetail.page.js";
import { expect } from "@wdio/globals";
import { loadEnvBasedData } from "../../utils/envUtils.js";
import { selectors } from "../../common/selectors.js";
import { successMessages } from "../../common/successMessages.js";
import BasePage from "../../pageobjects/core/basepage.js";
import LoginPage from "../../pageobjects/login-pages/login.page.js";
import * as cookiesData from "../../data/common/cookies.json";

// Success message to verify campaign updates
const campaignUpdateMessage = successMessages.campaign.campaignUpdated;

// Variables reused across tests
let quotaValue: string;
let cookieName: string;
let campaignData: any;

// Group of tests for Campaign Quota feature
describe("Campaign Quota Tests @campaignQuota", () => {
  // Load campaign data before running tests
  before(async () => {
    campaignData = loadEnvBasedData("campaign-data/campaignData.json");
  });

  // Navigate to Campaign Page before each test
  beforeEach(async () => {
    await CampaignSearchPage.open();
  });

  describe("Campaign Quota Smoke and Regression Tests @smoke @regression", () => {
    it("Verify that quota can be set for a cookie variety (standard)", async () => {
      quotaValue = (await BasePage.generateRandomThreeDigits()).toString();
      let cookie: string = cookiesData.cookiesName[0];

      // Open specific campaign by ID
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);

      // Fill quota for a cookie
      await campaignDetailPage.fillQuotaForCookie(cookie, quotaValue);

      // Save changes
      await selectors.submitButton.click();
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Go back and re-open campaign to confirm persistence
      await BasePage.backToSearchScreen();
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);

      // Assert quota value matches the expected input
      await expect(
        (await campaignDetailPage.getCookieQuotaValue(cookie)).toString()
      ).toEqual(quotaValue);
    });
  });

  it("Verify that an existing quota can be edited", async () => {
    quotaValue = (await BasePage.generateRandomThreeDigits()).toString();
    let updatedQuotaValue: string = (
      await BasePage.generateRandomThreeDigits()
    ).toString();
    cookieName = cookiesData.cookiesName[1];

    // Open campaign and set initial quota
    await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
    await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
    await selectors.submitButton.click();
    await BasePage.expectMessageAppeared(campaignUpdateMessage);

    // Re-open campaign and update quota
    await BasePage.backToSearchScreen();
    await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
    await campaignDetailPage.fillQuotaForCookie(cookieName, updatedQuotaValue);
    await selectors.submitButton.click();
    await BasePage.expectMessageAppeared(campaignUpdateMessage);

    // Validate updated quota value is saved
    await expect(
      (await campaignDetailPage.getCookieQuotaValue(cookieName)).toString()
    ).toEqual(updatedQuotaValue);
  });

  describe("Campaign Quota Only Regression Tests @regression", () => {
    it("Verify that quota value persists across sessions", async () => {
      quotaValue = (await BasePage.generateRandomThreeDigits()).toString();
      cookieName = cookiesData.cookiesName[2];

      // Set quota and save
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Logout and login again
      await LoginPage.logout();
      await CampaignSearchPage.open();
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);

      // Verify quota is still set correctly
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookieName)
      ).toEqual(quotaValue);
    });

    it("Verify that blank quota input is handled", async () => {
      quotaValue = (await BasePage.generateRandomThreeDigits()).toString();
      cookieName = cookiesData.cookiesName[3];

      // Save initial quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Clear quota input and save again
      (await campaignDetailPage.getCookieQuotaInput(cookieName)).clearValue();
      await selectors.submitButton.click();

      // Verify quota value is now empty
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookieName)
      ).toEqual("");
    });

    it("Verify that an extremely large quota is accepted", async () => {
      quotaValue = (await BasePage.generateRandomNineDigits()).toString();
      cookieName = cookiesData.cookiesName[4];

      // Set large quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Validate it is saved correctly
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookieName)
      ).toEqual(quotaValue);
    });

    it("Verify that non-numeric quota input is rejected", async () => {
      quotaValue = (await BasePage.generateRandomFiveChars()).toString();
      cookieName = cookiesData.cookiesName[5];

      // Try setting non-numeric quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();

      // Expect success message
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Quota should not actually be saved (remains blank)
      await expect(
        await campaignDetailPage.getCookieQuotaValue("Toffee-tastic")
      ).toEqual("");
    });

    it("Verify that decimal quota input is handled", async () => {
      quotaValue = "12.5";
      cookieName = cookiesData.cookiesName[6];

      // Try setting non-numeric quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();

      // Expect success message
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Quota should not ignore points and save only integer part
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookieName)
      ).toEqual("125");
    });

    it("Verify that negative quota input is handled", async () => {
      quotaValue = "-10";
      cookieName = cookiesData.cookiesName[7];

      // Try setting non-numeric quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();

      // Expect success message
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Quota should not ignore points and save only integer part
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookieName)
      ).toEqual("10");
    });

    it("Verify that the Cancel button discards unsaved changes to quotas.", async () => {
      quotaValue = (await BasePage.generateRandomThreeDigits()).toString();
      let updateQuotaValue: string = (
        await BasePage.generateRandomThreeDigits()
      ).toString();
      cookieName = cookiesData.cookiesName[8];

      // Open campaign and set initial quota
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, quotaValue);
      await selectors.submitButton.click();
      await BasePage.expectMessageAppeared(campaignUpdateMessage);

      // Re-open campaign and update quota value but do not save
      await BasePage.backToSearchScreen();
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      await campaignDetailPage.fillQuotaForCookie(cookieName, updateQuotaValue);

      // Click Cancel to discard changes
      await selectors.cancelButton.click();

      // Validate updated quota value is not saved and original remains
      await expect(
        (await campaignDetailPage.getCookieQuotaValue(cookieName)).toString()
      ).toEqual(quotaValue);
    });

    it("Verify that concurrent quota updates are correctly handled and last save wins", async () => {
      const cookie: string = cookiesData.cookiesName[0];
      const quota1 = (await BasePage.generateRandomThreeDigits()).toString();
      const quota2 = (await BasePage.generateRandomThreeDigits()).toString();

      // Tab 1 - open campaign
      await CampaignSearchPage.searchAndOpenCampaign(campaignData.campaignId);
      const tab1 = await browser.getWindowHandle();

      // Capture current URL
      const currentUrl = await browser.getUrl();

      // Tab 2 - open same URL in new tab
      await browser.newWindow(currentUrl);
      const tab2 = await browser.getWindowHandle();

      // Execute both quota updates and submit concurrently
      await Promise.all([
        (async () => {
          await browser.switchToWindow(tab1);
          await campaignDetailPage.fillQuotaForCookie(cookie, quota1);
          await selectors.submitButton.click();
        })(),
        (async () => {
          await browser.switchToWindow(tab2);
          (await campaignDetailPage.getCookieQuotaInput(cookie)).clearValue();
          await campaignDetailPage.fillQuotaForCookie(cookie, quota2);
          await selectors.submitButton.click();
        })(),
      ]);

      // Verify last save wins
      await browser.switchToWindow(tab1);
      await browser.refresh();
      await expect(
        await campaignDetailPage.getCookieQuotaValue(cookie)
      ).toEqual(quota2);
    });
  });
});
