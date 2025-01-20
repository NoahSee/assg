import mysql from "mysql2/promise";

export default async function setupTransactionsDb(
  connection: mysql.Connection
): Promise<void> {
  console.log("setupTransactionsDb");
  // SQL query to create a table
  const createTableQuery: string = `
            CREATE TABLE IF NOT EXISTS transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hash VARCHAR(255) NOT NULL,
                gas_price BIGINT NOT NULL,
                gas_used BIGINT NOT NULL,
                timestamp BIGINT NOT NULL
            );
        `;

  try {
    // Execute the query using await
    await connection.query(createTableQuery);
    console.log("Table created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}
