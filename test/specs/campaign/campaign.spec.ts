import campaignSearchPage from "../../pageobjects/campaign-pages/campaignSearch.page.js";
import { expect } from "@wdio/globals";
import { loadEnvBasedData } from "../../utils/envUtils.js";
import { selectors } from "../../common/selectors.js";
import BasePage from "../../pageobjects/core/basepage.js";

let campaignData: any;
let headerText = "Campaign";

// Group of tests for Campaign Quota feature
describe("Campaign Quota Tests @campaign", () => {
  // Load campaign data before running tests
  before(async () => {
    campaignData = loadEnvBasedData("campaign-data/campaignData.json");
  });

  // Navigate to Campaign Page before each test
  beforeEach(async () => {
    await campaignSearchPage.open();
  });

  it("Verify that national admin having access to Campaign module", async () => {
    // Verify that the campaign detail page is displayed
    const actualHeader = await selectors.greenBarPageHeader.getText();
    await expect(actualHeader).toEqual(headerText);

    // Verify that all search input elements are visible
    await expect(campaignSearchPage.campaignNameSearchInput).toBeDisplayed();
    await expect(campaignSearchPage.campaignIdSearchInput).toBeDisplayed();
    await expect(campaignSearchPage.councilNameSearchInput).toBeDisplayed();
    await expect(campaignSearchPage.councilIDSearchInput).toBeDisplayed();
    await expect(
      campaignSearchPage.currentCampaignsSearchCheckbox
    ).toBeDisplayed();
  });

  it("Verify that national admin can search specific Campaign", async () => {
    // Search campaign
    await campaignSearchPage.searchByCampaignId(campaignData.campaignId);

    // Verify that search result contains the searched campaign
    let searchResultCampaignId = await BasePage.getElementByTagAndText(
      "a",
      campaignData.campaignId
    );
    await expect(searchResultCampaignId).toBeDisplayed();
  });
});
