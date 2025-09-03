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
   * @param messageText - the exact or partial text of the message
   */
  public async expectMessageDisplayed(messageText: string): Promise<void> {
    const messageEl = $(`//*[contains(text(), "${messageText}")]`);
    await messageEl.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Expected message "${messageText}" was not displayed`,
    });
    await expect(messageEl).toBeDisplayed();
  }
}

// Export a singleton instance
export default new BasePage();
