import CampaignPage from "../../pageobjects/campaign-pages/campaign.page.js";
import BasePage from "../../pageobjects/core/basepage.js";
import { expect } from "@wdio/globals";
import { routes } from "../../common/routes.js";
import { loadEnvBasedData } from "../../utils/envUtils.js";
import campaignPage from "../../pageobjects/campaign-pages/campaign.page.js";
import { selectors } from "../../common/selectors.js";
import { successMessages } from "../../common/successMessages.js";
let campaignData: any;
let quotaValue: string = "100";

describe("Campaign Quota Tests @campaign", () => {
  before(async () => {
    campaignData = loadEnvBasedData("campaign/campaignData.json");
  });

  beforeEach(async () => {
    await CampaignPage.open();
  });

  it("Verify that quota can be set for a cookie variety (standard)", async () => {
    await CampaignPage.searchAndOpenCampaign(campaignData.cqa.campaignId);
    await campaignPage.fillQuotaForCookie("Thin Mints", quotaValue);
    await selectors.submitButton.click();
    expect(successMessages.campaign.campaignUpdated).toBeDisplayed();
    await CampaignPage.searchAndOpenCampaign(campaignData.cqa.campaignId);
    await expect(await campaignPage.getCookieQuotaValue("Thin Mints")).toEqual(
      quotaValue
    );
  });
});
