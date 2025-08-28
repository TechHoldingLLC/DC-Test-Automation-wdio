import CampaignPage from "../../pageobjects/campaign-pages/campaign.page.js";
import BasePage from "../../pageobjects/core/basepage.js";
import { expect } from "@wdio/globals";
import { routes } from "../../common/routes.js";
import { loadEnvBasedData } from "../../utils/envUtils.js";
let campaignData: any;

describe("Campaign Quota Tests", () => {
  before(async () => {
    campaignData = loadEnvBasedData("campaign/campaignData.json");
  });

  beforeEach(async () => {
    await CampaignPage.open();
  });

  it("Verify that quota can be set for a cookie variety (standard)", async () => {
    await CampaignPage.searchByCampaignId(campaignData.cqa.campaignId);
    await CampaignPage.clickLinkInTableCell(
      "Campaign ID",
      campaignData.cqa.campaignId
    );
  });
});
