const ENV = process.env.TEST_ENV || "cqa"; // default to cqa

/**
 * Returns the base URL for APIs based on the current environment
 */
export const getApiBaseUrl = (): string => {
  switch (ENV) {
    case "prod":
      return "";
    case "cuat":
      return "https://api.ccifn5lai-girlscout2-p2-public.model-t.cc.commerce.ondemand.com/rest/v2";
    case "cqa":
    default:
      return "https://api.ccifn5lai-girlscout2-d2-public.model-t.cc.commerce.ondemand.com/rest/v2";
  }
};
