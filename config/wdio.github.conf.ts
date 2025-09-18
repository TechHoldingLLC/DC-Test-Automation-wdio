import { config as baseConfig } from "./wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--headless=new", // run headless for GitHub Actions
          "--disable-infobars",
          "--disable-extensions",
          "--window-size=1920,1080",
        ],
      },
    },
  ],

  services: [],
};
