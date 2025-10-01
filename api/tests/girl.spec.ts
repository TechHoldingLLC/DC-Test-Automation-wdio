import { expect } from "@wdio/globals";
import { getGirl } from "../services/girlService";

describe("GirlScout API Tests", () => {
  it("Verify GirlScout API returns 200 status and the correct gsusaId", async () => {
    const gsusaIdValue = "300321847";
    const token = "xuO8bLooVvYvrVilDHrY5ZtbuYI"; // Pass token here

    const requestBody = {
      transaction: { id: "B-B50P1AF39EAE23" },
      girls: { gsusaId: gsusaIdValue },
    };

    // Record start time
    const startTime = Date.now();

    // Send API request with token
    const response = (await getGirl(requestBody, token)) as any;

    // Record end time & calculate duration
    const duration = Date.now() - startTime;

    // Log to console
    console.log(`Response time: ${duration} ms`);

    // Assertions
    expect(response.status).toEqual(200); // status 200
    expect(duration).toBeLessThan(2000); // response time < 2s
    expect(response.data).toHaveProperty("girl"); // contains "girl"
    expect(response.data.girl).toHaveProperty("gsusaId", gsusaIdValue); // correct gsusaId
  });
});
