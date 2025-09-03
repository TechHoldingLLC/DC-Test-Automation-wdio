import CampaignPage from "../../pageobjects/campaign-pages/campaign.page.js";
import { expect } from "@wdio/globals";
import { loadEnvBasedData } from "../../utils/envUtils.js";
import { selectors } from "../../common/selectors.js";
import { successMessages } from "../../common/successMessages.js";
import BasePage from "../../pageobjects/core/basepage.js";
import LoginPage from "../../pageobjects/login-pages/login.page.js";
let campaignData: any;
let quotaValue: string;

describe("Campaign Quota Tests @campaignQuota", () => {
  before(async () => {
    campaignData = loadEnvBasedData("campaign-data/campaignData.json");
  });

  beforeEach(async () => {
    await CampaignPage.open();
  });

  it("Verify that quota can be set for a cookie variety (standard)", async () => {
    quotaValue = "100";
    await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
    await CampaignPage.fillQuotaForCookie("Thin Mints", quotaValue);
    await selectors.submitButton.click();
    // await expect(successMessages.campaign.campaignUpdated).toBeDisplayed();
    // await expect(
    //   $(`//*[text()='${successMessages.campaign.campaignUpdated}']`)
    // ).toBeDisplayed();
    await BasePage.backToSearchScreen();
    await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
    await expect(
      (await CampaignPage.getCookieQuotaValue("Thin Mints")).toString()
    ).toEqual(quotaValue);
  });
});

it("Verify that an existing quota can be edited", async () => {
  quotaValue = "100";
  let updatedQuotaValue: string = "150";
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Trefoils", quotaValue);
  await selectors.submitButton.click();
  await BasePage.backToSearchScreen();
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Trefoils", updatedQuotaValue);
  await expect(
    (await CampaignPage.getCookieQuotaValue("Trefoils")).toString()
  ).toEqual(updatedQuotaValue);
});

it("Verify that quota value persists across sessions @only", async () => {
  quotaValue = "200";
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Adventurefuls", quotaValue);
  await selectors.submitButton.click();
  await LoginPage.logout();
  await CampaignPage.open();
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await expect(await CampaignPage.getCookieQuotaValue("Samoas")).toEqual(
    quotaValue
  );
});

it("Verify that blank quota input is handled", async () => {
  quotaValue = "200";
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Samoas", quotaValue);
  await selectors.submitButton.click();
  (await CampaignPage.getCookieQuotaInput("Samoas")).clearValue();
  await selectors.submitButton.click();
  await expect(await CampaignPage.getCookieQuotaValue("Samoas")).toEqual("");
});

it("Verify that an extremely large quota is accepted", async () => {
  quotaValue = "999999999";
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Exploremores", quotaValue);
  await selectors.submitButton.click();
  await expect(await CampaignPage.getCookieQuotaValue("Exploremores")).toEqual(
    quotaValue
  );
});

it("Verify that non-numeric quota input is rejected", async () => {
  quotaValue = "fifty";
  await CampaignPage.searchAndOpenCampaign(campaignData.campaignId);
  await CampaignPage.fillQuotaForCookie("Toffee-tastic", quotaValue);
  await selectors.submitButton.click();

  // expect message is shown
  await BasePage.expectMessageDisplayed(
    "Campaign changes have been saved successfully!"
  );

  // expect quota is not saved
  await expect(await CampaignPage.getCookieQuotaValue("Toffee-tastic")).toEqual(
    ""
  );
});
