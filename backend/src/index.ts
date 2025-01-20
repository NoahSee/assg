import express, { Request, Response } from "express";
import getDbConnection from "./lib/getDbConnection";
import setupRateDb from "./lib/setupRateDb";
import setupTransactionsDb from "./lib/setupTransactionsDb";
import populateDb from "./lib/populateDb";

const app = express();
const port: number = 3000;

// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

async function initialize() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const conn = await getDbConnection();
  await setupRateDb(conn);
  await setupTransactionsDb(conn);

  const startTimestamp = new Date("2023-01-01").getTime() * 1000;
  const endTimestamp = startTimestamp + 3600000000; // +1h
  await populateDb(conn, startTimestamp, endTimestamp);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

initialize();
