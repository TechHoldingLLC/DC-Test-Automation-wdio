import { $ } from "@wdio/globals";
import Page from "./page.js";

class NationalDashboard extends Page {
  public get totalDigitalSalesChart() {
    return $("#generalStatistics");
  }

  public get onlineSalesByCookieChart() {
    return $("#salesByVariety");
  }

  public get btnLogin() {
    return $("#loginButton");
  }

  public get dashboardHeader() {
    return $("#girlTitle");
  }
}

export default new NationalDashboard();
