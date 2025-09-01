import { $ } from "@wdio/globals";
import BasePage from "../core/basepage.js";

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
}
export default new CampaignPage();
