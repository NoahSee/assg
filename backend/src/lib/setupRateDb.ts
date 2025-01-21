import mysql from "mysql2/promise";

export const sql = `
CREATE TABLE IF NOT EXISTS rate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    open_time BIGINT NOT NULL,
    close_price DECIMAL(10, 2) NOT NULL
);
`;

export default async function setupRateDb(
  connection: mysql.Connection
): Promise<void> {
  console.log("setupRateDb");

  try {
    // Execute the query using await
    await connection.query(sql);
    console.log("Table created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}
