import mysql from "mysql2/promise";

export default async function setupRateDb(
  connection: mysql.Connection
): Promise<void> {
  console.log("setupRateDb");
  // SQL query to create a table
  const createTableQuery: string = `
            CREATE TABLE IF NOT EXISTS rate (
                id INT AUTO_INCREMENT PRIMARY KEY,
                open_time BIGINT NOT NULL,
                close_price DECIMAL(10, 2) NOT NULL
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
