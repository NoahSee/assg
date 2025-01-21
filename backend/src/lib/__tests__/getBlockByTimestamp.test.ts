import { genUrl, parseResponse } from "../getBlockByTimestamp";

describe("genUrl", () => {
  it("should generate the correct URL", () => {
    const timestamp = 1672531200000000;
    const apiKey = "testApiKey";
    const expectedUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=1672531200&closest=before&apikey=${apiKey}`;
    expect(genUrl(timestamp, apiKey)).toBe(expectedUrl);
  });
});

describe("parseResponse", () => {
  it("should return the block number for a successful response", () => {
    const response = {
      data: {
        status: "1",
        result: "12345678",
      },
    };
    expect(parseResponse(response)).toBe(12345678);
  });

  it("should throw an error for an unsuccessful response", () => {
    const response = {
      data: {
        status: "0",
        message: "Error message",
      },
    };
    expect(() => parseResponse(response)).toThrow("Error: Error message");
  });
});
