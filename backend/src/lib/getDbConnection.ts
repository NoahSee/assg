import mysql from "mysql2/promise";

export default async function connectAndCreateTable(): Promise<mysql.Connection> {
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "example",
    database: "mydatabase",
  });

  const maxRetries = 5;
  let attempt = 0;

  async function tryConnect() {
    try {
      await connection.connect();
      console.log("Connected to the database.");
    } catch (err) {
      console.error("Error connecting to the database:", err);
      attempt++;
      if (attempt < maxRetries) {
        console.log(`Retrying connection (${attempt}/${maxRetries})...`);
        setTimeout(tryConnect, 2000);
      } else {
        console.error(
          "Max retries reached. Could not connect to the database."
        );
      }
    }
  }

  await tryConnect();

  // Return the connection
  return connection;
}
