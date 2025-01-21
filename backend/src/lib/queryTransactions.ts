import mysql from "mysql2/promise";

export function genSQL(
  startTimestamp: number,
  endTimestamp: number,
  hash: string | undefined | null,
  offset: number,
  page: number
): { query: string; params: any[] } {
  const safeHash = hash === undefined ? null : hash;
  const safeLimit = offset;
  const safeCalculatedOffset = (page - 1) * offset;

  let query = `
      SELECT 
          t.id AS transaction_id, 
          t.hash, 
          t.timestamp, 
          r.close_price, 
          (t.gas_price * t.gas_used / POWER(10, 18)) * r.close_price AS fee_usdt 
      FROM 
          transactions t 
      JOIN 
          rate r ON r.open_time = (
            SELECT MAX(open_time) 
            FROM rate 
            WHERE open_time <= t.timestamp
          )
      WHERE 
          t.timestamp BETWEEN ? AND ?`;

  const params: any[] = [startTimestamp, endTimestamp];

  if (safeHash !== null) {
    query += ` AND t.hash = ?`;
    params.push(safeHash);
  }

  query += `
      ORDER BY 
          t.timestamp DESC
      LIMIT ?
      OFFSET ?`;

  params.push(safeLimit, safeCalculatedOffset);

  return { query, params };
}

export default async function queryTransactions(
  connection: mysql.Connection,
  startTimestamp: number,
  endTimestamp: number,
  hash: string | undefined | null,
  offset: number,
  page: number
) {
  const { query, params } = genSQL(
    startTimestamp,
    endTimestamp,
    hash,
    offset,
    page
  );
  const [rows] = await connection.query(query, params);
  return rows;
}
