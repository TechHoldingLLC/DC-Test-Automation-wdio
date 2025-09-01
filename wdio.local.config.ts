import { config as baseConfig } from "./wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,

  capabilities: [
    {
      browserName: "chrome",
    },
    // {
    //   browserName: "firefox",
    // },
    // {
    //   browserName: "safari",
    // },
    // {
    //   browserName: "MicrosoftEdge",
    // },
  ],

  services: [],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    grep: process.env.TAGS || "", // Pick tags dynamically from CLI/env
  },
};
