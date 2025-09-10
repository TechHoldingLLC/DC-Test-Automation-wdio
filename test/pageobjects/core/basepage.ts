import Page from "./page";

class BasePage extends Page {
  /**
   * Clicks the search button in the header
   */
  async clickSearchButton(): Promise<void> {
    const searchButton = $('button[value="Search"]');
    await searchButton.waitForClickable();
    await searchButton.click();
  }

  /**
   * Opens a menu item by visible text
   */
  async openMenu(menuText: string): Promise<void> {
    const menu = $(`//a[normalize-space(text())='${menuText}']`);
    await menu.waitForClickable();
    await menu.click();
  }

  /**
   * Clicks on a link in a table cell, based on dynamic column header and link text.
   *
   * @param headerValue - The value of the 'headers' attribute in the target <td>
   * @param linkText - The visible text of the link to click
   */
  public async clickLinkInTableCell(
    headerValue: string,
    linkText: string
  ): Promise<void> {
    const link = $(
      `//td[@headers='${headerValue}']/a[normalize-space(text())='${linkText}']`
    );
    await link.waitForClickable();
    await link.click();
  }

  async clickElement(element: WebdriverIO.Element): Promise<void> {
    await element.waitForClickable();
    await element.click();
  }

  /**
   * Clicks the "<< search" link on pages that have it
   */
  async backToSearchScreen(): Promise<void> {
    // Using partial link text for more flexibility
    const backToSearchLink = $("*=search");
    await backToSearchLink.waitForClickable();
    await backToSearchLink.click();
  }

  /**
   * Waits for a message containing the given text to appear on screen
   * @param messageText - the message text to look for
   */
  public async expectMessageAppeared(messageText: string): Promise<void> {
    const messageEl = $(`//*[contains(text(), "${messageText}")]`);
    await browser.waitUntil(async () => await messageEl.isExisting(), {
      timeout: 3000,
      timeoutMsg: `Message "${messageText}" not found`,
    });
  }

  public async generateRandomThreeDigits(): Promise<number> {
    return Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
  }

  public async generateRandomNineDigits(): Promise<number> {
    const randomInt = Math.floor(Math.random() * 900000000) + 100000000; // Generates a number between 100,000,000 and 999,999,999
    return randomInt;
  }

  public async generateRandomFiveChars(): Promise<string> {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
}

// Export a singleton instance
export default new BasePage();
