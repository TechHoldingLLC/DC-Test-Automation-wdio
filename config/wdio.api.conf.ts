import type { Options } from "@wdio/types";
import { config as baseConfig } from "../config/wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  runner: "local",
  specs: ["../api/tests/**/*.ts"],

  capabilities: [
    {
      browserName: "chrome", // required by WDIO but won't actually open a browser
    },
  ],

  services: [], // no browser services needed for API

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  before: function () {
    console.log(`${process.env.TEST_ENV || "cqa"}`);
  },
};
