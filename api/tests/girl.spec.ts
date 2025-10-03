import { getGirl } from "../services/girlService";
import { expect } from "@wdio/globals";
import { getApiBaseUrl } from "../utils/envApiUtils";
const token = "xuO8bLooVvYvrVilDHrY5ZtbuYI";

describe("Get Girl API Test", () => {
  it("Verify GET GirlScout API returns 200 status and the correct gsusaId", async () => {
    console.log("Request URL:", getApiBaseUrl() + "/girlscouts/getGirl");

    const requestBody = {
      transaction: { id: "B-B50P1AF39EA21" },
      girls: { gsusaId: "300321847" },
    };

    const { response, responseTime } = await getGirl(requestBody, token);
    console.log(`Response time: ${responseTime} ms`);
    console.log("Response body:", response.body);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.girl.gsusaId).toBe(requestBody.girls.gsusaId);
    expect(responseTime).toBeLessThan(2000); // response time in ms
  });
});
