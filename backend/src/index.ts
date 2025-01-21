import cors from "cors";
import express, { Request, Response } from "express";
import getDbConnection from "./lib/getDbConnection";
import setupRateDb from "./lib/setupRateDb";
import setupTransactionsDb from "./lib/setupTransactionsDb";
import populateDb from "./lib/populateDb";
import queryTransactions from "./lib/queryTransactions";

const app = express();
const port: number = 3001;

async function init() {
  // Wait for db to startup
  await new Promise((resolve) => setTimeout(resolve, 60000));

  // Connect to DB
  const conn = await getDbConnection();

  // Setup DB tables
  await setupRateDb(conn);
  await setupTransactionsDb(conn);

  // Populate 1h worth of data
  const startTimestamp = new Date("2023-01-01").getTime() * 1000;
  const endTimestamp = startTimestamp + 3600000000; // +1h
  await populateDb(conn, startTimestamp, endTimestamp);

  // Run populateDb every 1 minute to get live data
  setInterval(async () => {
    try {
      const endTimestamp = Date.now() * 1000; // Current time in microseconds
      const startTimestamp = endTimestamp - 60000000; // 1 minute ago in microseconds

      await populateDb(conn, startTimestamp, endTimestamp);
      console.log("Database populated successfully");
    } catch (error) {
      console.error(`Error populating database: ${error}`);
    }
  }, 60000); // 60000 ms = 1 minute

  app.use(cors());

  // Populate Db API
  app.get("/populate-db", async (req: Request, res: Response) => {
    const startTimestamp = parseInt(req.query.startTimestamp as string, 10);
    const endTimestamp = parseInt(req.query.endTimestamp as string, 10);
    await populateDb(conn, startTimestamp, endTimestamp)
      .then(() => res.send("Database populated successfully"))
      .catch((error) =>
        res.status(500).send(`Error populating database: ${error.message}`)
      );
  });

  // Get Transactions API
  app.get("/get-transactions", async (req: Request, res: Response) => {
    const startTimestamp = parseInt(req.query.startTimestamp as string, 10);
    const endTimestamp = parseInt(req.query.endTimestamp as string, 10);
    const hash = req.query.hash as string;
    const offset = parseInt(req.query.offset as string, 10);
    const page = parseInt(req.query.page as string, 10);
    await queryTransactions(
      conn,
      startTimestamp,
      endTimestamp,
      hash,
      offset,
      page
    )
      .then((result) => res.json(result))
      .catch((error) =>
        res.status(500).send(`Error getting transactions: ${error.message}`)
      );
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

init();
