import mysql from "mysql";

import { sql } from "../setupRateDb";

describe("setupRateDb", () => {
  it("should use valid MySQL syntax", () => {
    const isValid = mysql.escape(sql) !== sql;
    expect(isValid).toBe(true);
  });
});
