import { browser } from "@wdio/globals";
import { getBaseUrl } from "../utils/envUtils"; // Adjust path as needed

export default class Page {
  /**
   * Navigates to a specific path of the application under the base URL
   * @param path - The relative path to navigate to
   */
  public open(path: string) {
    const baseUrl = getBaseUrl();
    return browser.url(`${baseUrl}${path}`);
  }
}
