import mysql from "mysql2/promise";
import populateRateDb from "./populateRateDb";
import populateTransactionsDb from "./populateTransactionsDb";

export default async function populateDb(
  connection: mysql.Connection,
  startTimestamp: number,
  endTimestamp: number
): Promise<void> {
  console.log("populateDb", startTimestamp, endTimestamp);
  await populateRateDb(connection, startTimestamp, endTimestamp);
  await populateTransactionsDb(connection, startTimestamp, endTimestamp);
}
