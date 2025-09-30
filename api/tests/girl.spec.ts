import { expect } from "chai";
import { getGirl } from "../services/girlService";

describe("GirlScout API Tests", () => {
  it("Verify GET GirlScout API returns 200 status and the correct gsusaId", async () => {
    const gsusaIdValue = "300321847";

    const requestBody = {
      transaction: { id: "B-B50P1AF39EAE2" },
      girls: { gsusaId: gsusaIdValue }, // request has "girls"
    };

    const startTime = Date.now();
    const response = (await getGirl(requestBody)) as any;
    const endTime = Date.now();
    const duration = endTime - startTime; // duration in milliseconds

    // Assert status
    expect(response.status).to.equal(200);

    // Assert response time < 2s (2000ms)
    expect(duration).to.be.lessThan(2000);
    console.log(`Response time: ${duration} ms`);

    // Assert response body
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("girl");
    expect(response.data.girl).to.have.property("gsusaId", gsusaIdValue);
  });
});
