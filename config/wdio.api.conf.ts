import type { Options } from "@wdio/types";
import { config as baseConfig } from "./wdio.base.conf";

export const config: Options.Testrunner = {
  ...baseConfig,

  specs: ["../api/tests/**/*.ts"],

  capabilities: [
    {
      browserName: "chrome", // Required field, won't actually open
      maxInstances: 1,
    },
  ],

  services: [],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  before: function () {
    console.log("Running tests...");
  },
};
