import mysql from "mysql2/promise";
import getEthUsdt from "./getEthUsdt";

export default async function populateRateDb(
  connection: mysql.Connection,
  startTimestamp: number,
  endTimestamp: number
) {
  console.log("populateRateDb", startTimestamp, endTimestamp);
  let startTime = startTimestamp;
  const endTime = endTimestamp;
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

  console.log(startTime, endTime);

  while (startTime < endTime) {
    const nextBatchTime = Math.min(startTime + oneDay * 1000, endTime);
    const records: any = await getEthUsdt(startTime, nextBatchTime);

    const query = "INSERT INTO rate (open_time, close_price) VALUES ?";

    const values = records.map((record: any) => [record[0], record[4]]);

    await connection.query(query, [values]);

    startTime = nextBatchTime;
  }
}
