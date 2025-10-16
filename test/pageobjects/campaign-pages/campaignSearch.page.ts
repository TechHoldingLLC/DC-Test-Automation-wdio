import { $ } from "@wdio/globals";
import BasePage from "../core/basepage.js";
import LoginPage from "../login-pages/login.page.js";
import Page from "../core/page.js";
import { selectors } from "../../common/selectors.js";

class CampaignSearchPage extends Page {
  /**
   * Navigate to the Campaign page via the menu
   */
  async open() {
    await LoginPage.open();
    await LoginPage.login();
    await BasePage.openMenu("Campaign");
  }

  // Form input getters
  public get campaignIdSearchInput() {
    return $("#searchCampaignID");
  }

  // Campaign Name input
  public get campaignNameSearchInput() {
    return $("#searchCampaignName");
  }

  // Council ID input
  public get councilIDSearchInput() {
    return $("//input[@id='councilID']");
  }

  // Council Name input
  public get councilNameSearchInput() {
    return $("//input[@id='councilName']");
  }

  // Current Campaigns checkbox
  public get currentCampaignsSearchCheckbox() {
    return $("//*[@for='currentCampaigns']");
  }

  public async searchByCampaignId(CampaignId: string): Promise<void> {
    await this.campaignIdSearchInput.setValue(CampaignId);
    await selectors.submitButton.click();
  }

  public async searchAndOpenCampaign(CampaignId: string): Promise<void> {
    await this.searchByCampaignId(CampaignId);
    await BasePage.clickLinkInTableCell("Campaign ID", CampaignId);
  }
}

export default new CampaignSearchPage();
