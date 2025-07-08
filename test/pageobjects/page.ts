import { browser } from "@wdio/globals";

export default class Page {
  /**
   * Navigates to a specific path of the application under the base URL
   * @param path - The relative path to navigate to
   */
  public open(path: string) {
    return browser.url(`https://cuat.digitalcookie.girlscouts.org/${path}`);
  }
}
