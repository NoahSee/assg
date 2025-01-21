import { genSQL } from "../queryTransactions";

describe("genSQL", () => {
  it("should generate SQL query with all parameters", () => {
    const startTimestamp = 1672531200000;
    const endTimestamp = 1672534800000;
    const hash = "0x123";
    const offset = 10;
    const page = 1;

    const { query, params } = genSQL(
      startTimestamp,
      endTimestamp,
      hash,
      offset,
      page
    );

    expect(params).toEqual([startTimestamp, endTimestamp, hash, offset, 0]);
  });

  it("should generate SQL query without hash", () => {
    const startTimestamp = 1672531200000;
    const endTimestamp = 1672534800000;
    const hash = null;
    const offset = 10;
    const page = 1;

    const { query, params } = genSQL(
      startTimestamp,
      endTimestamp,
      hash,
      offset,
      page
    );

    expect(params).toEqual([startTimestamp, endTimestamp, offset, 0]);
  });

  it("should calculate correct offset for pagination", () => {
    const startTimestamp = 1672531200000;
    const endTimestamp = 1672534800000;
    const hash = null;
    const offset = 10;
    const page = 3;

    const { query, params } = genSQL(
      startTimestamp,
      endTimestamp,
      hash,
      offset,
      page
    );

    expect(params).toEqual([startTimestamp, endTimestamp, offset, 20]);
  });
});
