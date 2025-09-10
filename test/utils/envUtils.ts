import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const ENV = process.env.TEST_ENV || "cqa"; // default to cqa

/**
 * Returns environment-specific data from a given JSON data file.
 * @param fileName - Name of the JSON file inside the /data directory (e.g., "registrationData.json")
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadEnvBasedData = (relativePath: string) => {
  const filePath = path.resolve(__dirname, "../../test/data/", relativePath);
  const rawData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(rawData);
  return json[ENV];
};

/**
 * Returns the base URL based on current environment
 */
export const getBaseUrl = () => {
  switch (ENV) {
    case "prod":
      return "https://digitalcookie.girlscouts.org/";
    case "cuat":
      return "https://cuat.digitalcookie.girlscouts.org/";
    case "cqa":
    default:
      return "https://cqa.digitalcookie.girlscouts.org/";
  }
};
