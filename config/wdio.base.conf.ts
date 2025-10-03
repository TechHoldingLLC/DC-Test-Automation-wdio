import type { Options } from "@wdio/types";
import * as path from "path";

export const config: Options.Testrunner = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",

  // specs: [path.join(process.cwd(), "test/specs/**/*.ts")],
  specs: [
    path.join(process.cwd(), "test/specs/login/login.spec.ts"),
    path.join(process.cwd(), "test/specs/login/forgotPassword.spec.ts"),
    path.join(process.cwd(), "test/specs/login/registration.spec.ts"),
    path.join(process.cwd(), "test/specs/campaign/campaignQuota.spec.ts"),
  ],

  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  logLevel: "error",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 1200000,
  connectionRetryCount: 3,
  services: [],
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 12000000,
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    // If a test fails, capture a screenshot and attach it to the Allure report
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
