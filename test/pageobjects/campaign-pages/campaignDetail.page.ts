import { $ } from "@wdio/globals";
import BasePage from "../core/basepage.js";
import Page from "../core/page.js";

class CampaignDetailPage extends Page {
  public async getCookieQuotaInput(
    cookieName: string,
    session: WebdriverIO.Browser = browser
  ) {
    return session.$(
      `//td[contains(., '${cookieName}')]/following-sibling::td/input[contains(@id, '.quota')]`
    );
  }

  public async fillQuotaForCookie(
    cookieName: string,
    quotaValue: string,
    session: WebdriverIO.Browser = browser
  ): Promise<void> {
    const quotaInput = await this.getCookieQuotaInput(cookieName, session);
    await quotaInput.waitForClickable();
    await quotaInput.setValue(quotaValue);
  }

  public async getCookieQuotaValue(
    cookieName: string,
    session: WebdriverIO.Browser = browser
  ): Promise<string> {
    const quotaInput = await this.getCookieQuotaInput(cookieName, session);
    return quotaInput.getAttribute("value");
  }
}

export default new CampaignDetailPage();
