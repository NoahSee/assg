import mysql from "mysql2/promise";

export const sql: string = `
          CREATE TABLE IF NOT EXISTS transactions (
              id INT AUTO_INCREMENT PRIMARY KEY,
              hash VARCHAR(255) NOT NULL,
              gas_price BIGINT NOT NULL,
              gas_used BIGINT NOT NULL,
              timestamp BIGINT NOT NULL
          );
      `;

export default async function setupTransactionsDb(
  connection: mysql.Connection
): Promise<void> {
  console.log("setupTransactionsDb");
  try {
    await connection.query(sql);
    console.log("Table created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}
