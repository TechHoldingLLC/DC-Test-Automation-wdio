import { config as baseConfig } from "./wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,

  // ====================
  // LambdaTest Hub details
  // ====================
  hostname: "hub.lambdatest.com",
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  services: ["lambdatest"],

  // ====================
  // Browser capabilities
  // ====================
  capabilities: [
    // Chrome on Windows 10
    {
      browserName: "chrome",
      browserVersion: "latest",
      "LT:Options": {
        platformName: "Windows 10",
        resolution: "1600x1200",
        // Directly use TEST_ENV selected in workflow_dispatch dropdown
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Chrome`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Chrome`,
        w3c: true,
      },
    },

    // 🔹 Uncomment below for additional browsers/devices if needed
    /*
    // Firefox on macOS Big Sur
    {
      browserName: "Firefox",
      browserVersion: "latest",
      "LT:Options": {
        platformName: "macOS Big sur",
        resolution: "2560x1440",
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Firefox`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Firefox`,
        w3c: true,
      },
    },

    // Mobile Chrome on Android
    {
      browserName: "Chrome",
      "LT:Options": {
        platformName: "android",
        platformVersion: "14",
        appiumVersion: "2.6.0",
        deviceName: "Pixel 9 Pro",
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Mobile Android Chrome`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Mobile Android Chrome`,
        w3c: true,
      },
    },

    // Mobile Safari on iOS
    {
      browserName: "Safari",
      "LT:Options": {
        platformName: "ios",
        platformVersion: "18.1",
        appiumVersion: "2.11.3",
        deviceName: "iPhone 16 Pro Max",
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Mobile iOS Safari`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Mobile iOS Safari`,
        w3c: true,
      },
    },

    // Safari on macOS Sonoma
    {
      browserName: "Safari",
      browserVersion: "17",
      "LT:Options": {
        platformName: "macOS Sonoma",
        resolution: "1920x1080",
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Safari`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Safari`,
        w3c: true,
      },
    },

    // Microsoft Edge on Windows 11
    {
      browserName: "MicrosoftEdge",
      browserVersion: "latest",
      "LT:Options": {
        platformName: "Windows 11",
        resolution: "1680x1050",
        build: `DC-Test-Automation - ${process.env.TEST_ENV?.toUpperCase()} - Microsoft Edge`,
        project: "GSUSA",
        name: `GSUSA - ${process.env.TEST_ENV} run - Microsoft Edge`,
        w3c: true,
      },
    },
    */
  ],
};
