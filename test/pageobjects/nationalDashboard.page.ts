import { $ } from "@wdio/globals";
import Page from "./page.js";

class NationalDashboard extends Page {
  /**
   * Returns the element representing the Total Digital Sales chart section
   */
  public get totalDigitalSalesChart() {
    return $("#generalStatistics");
  }

  /**
   * Returns the element representing the Online Sales by Cookie Variety chart
   */
  public get onlineSalesByCookieChart() {
    return $("#salesByVariety");
  }

  /**
   * Returns the login button element (if displayed on this page)
   */
  public get btnLogin() {
    return $("#loginButton");
  }

  /**
   * Returns the header element of the dashboard containing the Girl Scout title
   */
  public get dashboardHeader() {
    return $("#girlTitle");
  }
}

export default new NationalDashboard();
