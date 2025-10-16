import Page from "./page";

/**
 * BasePage provides a set of common methods and utilities used across multiple page objects.
 * This class inherits from the generic 'Page' class (assumed to handle basic 'open' functionality).
 */
class BasePage extends Page {
  /**
   * Clicks the search button in the header.
   */
  public async clickSearchButton(): Promise<void> {
    const searchButton = $('button[value="Search"]');
    await searchButton.waitForClickable();
    await searchButton.click();
  }

  /**
   * Opens a menu item by visible text.
   * Assumes the menu item is an anchor (<a>) tag.
   *
   * @param menuText - The visible text of the menu link to click.
   */
  public async openMenu(menuText: string): Promise<void> {
    const menu = $(`//a[normalize-space(text())='${menuText}']`);
    await menu.waitForClickable();
    await menu.click();
  }

  /**
   * Clicks on a link in a table cell, based on dynamic column header and link text.
   *
   * @param headerValue - The value of the 'headers' attribute in the target <td>.
   * @param linkText - The visible text of the link to click.
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

  /**
   * Clicks a provided WebdriverIO element after waiting for it to be clickable.
   *
   * @param element - The WebdriverIO element to click.
   */
  public async clickElement(element: WebdriverIO.Element): Promise<void> {
    await element.waitForClickable();
    await element.click();
  }

  /**
   * Clicks the "<< search" link on pages that have it to navigate back to the search screen.
   */
  public async backToSearchScreen(): Promise<void> {
    // Using partial link text for more flexibility
    const backToSearchLink = $("*=search");
    await backToSearchLink.waitForClickable();
    await backToSearchLink.click();
  }

  /**
   * Waits for a message containing the given text to appear on screen, typically used for success/error messages.
   *
   * @param messageText - The message text to look for.
   */
  public async expectMessageAppeared(messageText: string): Promise<void> {
    const messageEl = $(`//*[contains(text(), "${messageText}")]`);
    await browser.waitUntil(async () => await messageEl.isExisting(), {
      timeout: 3000,
      timeoutMsg: `Message "${messageText}" not found`,
    });
  }

  /**
   * Generates a random three-digit number (between 100 and 999).
   *
   * @returns A promise that resolves with the random three-digit number.
   */
  public async generateRandomThreeDigits(): Promise<number> {
    return Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
  }

  /**
   * Generates a random nine-digit number (between 100,000,000 and 999,999,999).
   *
   * @returns A promise that resolves with the random nine-digit number.
   */
  public async generateRandomNineDigits(): Promise<number> {
    const randomInt = Math.floor(Math.random() * 900000000) + 100000000; // Generates a number between 100,000,000 and 999,999,999
    return randomInt;
  }

  /**
   * Generates a random string of five characters using upper and lower-case letters.
   *
   * @returns A promise that resolves with the random five-character string.
   */
  public async generateRandomFiveChars(): Promise<string> {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  /**
   * Finds an element using its tag name and its exact visible text content.
   * This uses an explicit, robust XPath selector.
   *
   * @param tag - The HTML tag name (e.g., 'a', 'span', 'div').
   * @param visibleText - The exact visible text the element should contain.
   * @returns A WebdriverIO ChainablePromiseElement for the found element.
   */
  public async getElementByTagAndText(
    tag: string,
    visibleText: string
  ): ChainablePromiseElement {
    // Uses normalize-space() for robust text matching, ignoring leading/trailing whitespace.
    return $(`//${tag}[normalize-space() = "${visibleText}"]`);
  }
}

// Export a singleton instance
export default new BasePage();
