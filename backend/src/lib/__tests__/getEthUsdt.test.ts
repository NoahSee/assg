// backend/src/lib/__tests__/yourTestFile.test.ts

import { genUrl, parseResponse } from "../getEthUsdt"; // Adjust the import path as necessary

describe("genUrl", () => {
  it("should generate a correct URL with valid parameters", () => {
    const expectedUrl =
      "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=1&endTime=9&limit=1000";
    const url = genUrl(1, 9);
    expect(url).toBe(expectedUrl);
  });
});

describe("parseResponse", () => {
  it("should correctly parse a valid response", () => {
    const response = { data: 2000, status: 200 };
    const expectedOutput = 2000;
    const result = parseResponse(response);
    expect(result).toBe(expectedOutput);
  });
});
