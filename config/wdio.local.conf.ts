import { config as baseConfig } from "./wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          // "--headless", // Run Chrome in headless mode
          "--disable-gpu", // Disable GPU (safer for CI)
          "--window-size=1920,1080", // Set window size for consistency
        ],
      },
    },
    // Uncomment below if needed for cross-browser runs:
    // {
    //   browserName: "firefox",
    //   "moz:firefoxOptions": {
    //     args: ["-headless"],
    //   },
    // },
    // { browserName: "safari" },
    // { browserName: "MicrosoftEdge" },
  ],

  services: [],

  mochaOpts: {
    ui: "bdd",
    timeout: 1200000,
    grep: process.env.TAGS || "", // Pick tags dynamically from CLI/env
  },
};
