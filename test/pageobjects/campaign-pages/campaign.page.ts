import { $ } from "@wdio/globals";
import BasePage from "../core/basepage.js";
import { get } from "http";

class CampaignPage extends BasePage {
  /**
   * Navigate to the Campaign page via the menu
   */
  async open() {
    await this.openMenu("Campaign");
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
    await this.clickLinkInTableCell("Campaign ID", CampaignId);
  }

  public async getCookieQuotaInput(cookieName: string) {
    return $(
      `//input[contains(@id, '.quota') and preceding-sibling::td[contains(text(), '${cookieName}')]]`
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
    await quotaInput.waitForDisplayed();
    return quotaInput.getValue();
  }
}
export default new CampaignPage();
