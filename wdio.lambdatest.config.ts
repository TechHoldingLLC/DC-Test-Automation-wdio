import { config as baseConfig } from "./wdio.base.conf";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  hostname: "hub.lambdatest.com",
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  services: ["lambdatest"],
  capabilities: [
    {
      browserName: "Firefox",
      browserVersion: "latest",
      "LT:Options": {
        platformName: "macOS Big sur",
        resolution: "2560x1440",
        build: "DC-Test-Automation - Web - Firefox",
        project: "GSUSA",
        name: "GSUSA - Cross Browser Testing - Firefox",
        w3c: true,
      },
    },
    {
      browserName: "Chrome",
      "LT:Options": {
        platformName: "android",
        platformVersion: "14",
        appiumVersion: "2.6.0",
        deviceName: "Pixel 9 Pro",
        build: "DC-Test-Automation - Mobile - Android - Chrome",
        project: "GSUSA",
        name: "GSUSA - Mobile Browser Testing - Android with Chrome",
        w3c: true,
      },
    },
    // {
    //   browserName: "chrome",
    //   browserVersion: "latest",
    //   "LT:Options": {
    //     platformName: "Windows 10",
    //     resolution: "1600x1200",
    //     build: "DC-Test-Automation - Web - Chrome",
    //     project: "GSUSA",
    //     name: "GSUSA - Cross Browser Testing - Chrome",
    //     w3c: true,
    //   },
    // },
    // {
    //   browserName: "Safari",
    //   "LT:Options": {
    //     platformName: "ios",
    //     platformVersion: "18.1",
    //     appiumVersion: "2.11.3",
    //     deviceName: "iPhone 16 Pro Max",
    //     build: "DC-Test-Automation - Mobile - iOS - Safari",
    //     project: "GSUSA",
    //     name: "GSUSA - Mobile Browser Testing - iOS and Safari",
    //     w3c: true,
    //   },
    // },

    // {
    //   browserName: "Safari",
    //   browserVersion: "17",
    //   "LT:Options": {
    //     platformName: "macOS Sonoma",
    //     resolution: "1920x1080",
    //     build: "DC-Test-Automation - Web - Safari",
    //     project: "GSUSA",
    //     name: "GSUSA - Cross Browser Testing - Safari",
    //     w3c: true,
    //   },
    // },
    // {
    //   browserName: "MicrosoftEdge",
    //   browserVersion: "latest",
    //   "LT:Options": {
    //     platformName: "Windows 11",
    //     resolution: "1680x1050",
    //     build: "DC-Test-Automation - Web - Microsoft Edge",
    //     project: "GSUSA",
    //     name: "GSUSA - Cross Browser Testing - MicrosoftEdge",
    //     w3c: true,
    //   },
    // },
  ],
};
