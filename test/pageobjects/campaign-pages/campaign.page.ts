import { $ } from "@wdio/globals";
import BasePage from "../core/basepage.js";
import LoginPage from "../login-pages/login.page.js";
import Page from "../core/page.js";

class CampaignPage extends Page {
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

  public async searchByCampaignId(CampaignId: string): Promise<void> {
    await this.campaignIdSearchInput.setValue(CampaignId);
  }

  public async searchAndOpenCampaign(CampaignId: string): Promise<void> {
    await this.searchByCampaignId(CampaignId);
    await BasePage.clickLinkInTableCell("Campaign ID", CampaignId);
  }

  public async getCookieQuotaInput(cookieName: string) {
    return $(
      `//td[contains(., '${cookieName}')]/following-sibling::td/input[contains(@id, '.quota')]`
    );
  }

  public async fillQuotaForCookie(
    cookieName: string,
    quotaValue: string
  ): Promise<void> {
    const quotaInput = await this.getCookieQuotaInput(cookieName);
    await quotaInput.waitForClickable();
    await quotaInput.setValue(quotaValue);
  }

  public async getCookieQuotaValue(cookieName: string): Promise<string> {
    const quotaInput = await this.getCookieQuotaInput(cookieName);
    return quotaInput.getAttribute("value");
  }
}
export default new CampaignPage();
