import mysql from "mysql2/promise";
import getTransactions from "./getTransactions";
import getBlockByTimestamp from "./getBlockByTimestamp";

export default async function populateTransactionsDb(
  connection: mysql.Connection,
  startTimestamp: number,
  endTimestamp: number
) {
  console.log("populateTransactionsDb", startTimestamp, endTimestamp);
  let fromBlock = await getBlockByTimestamp(startTimestamp);
  let toBlock = await getBlockByTimestamp(endTimestamp);
  let hasMoreRecords = true;

  while (hasMoreRecords) {
    console.log(fromBlock);
    let records: any;

    try {
      records = await getTransactions(fromBlock, toBlock);
    } catch (error) {
      console.error("Failed to get transactions:", error); // Sometimes getting 502 for no reason
      hasMoreRecords = false;
      break;
    }
    if (!records || records.length === 0) {
      hasMoreRecords = false;
      break;
    }

    const query = `
          INSERT INTO transactions (hash, gas_price, gas_used, timestamp)
          VALUES ?
      `;

    const values = records
      .map((record: any) => [
        record.blockHash,
        parseInt(record.gasPrice, 16),
        parseInt(record.gasUsed, 16),
        parseInt(record.timeStamp, 16) * 1000,
      ])
      .filter(
        (valueArray: any) => !valueArray.some((value: any) => isNaN(value))
      );

    await connection.query(query, [values]);

    fromBlock = parseInt(records[records.length - 1].blockNumber, 16);
    if (fromBlock >= toBlock) {
      hasMoreRecords = false;
    }
  }
}
