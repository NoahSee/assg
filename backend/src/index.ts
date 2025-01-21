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
  const conn = await getDbConnection();

  await setupRateDb(conn);
  await setupTransactionsDb(conn);

  const startTimestamp = new Date("2023-01-01").getTime() * 1000;
  const endTimestamp = startTimestamp + 3600000000; // +1h
  await populateDb(conn, startTimestamp, endTimestamp);

  app.use(cors());

  // Default endpoint
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
  });

  // Populate Db
  app.get("/populate-db", async (req: Request, res: Response) => {
    const startTimestamp = parseInt(req.query.startTimestamp as string, 10);
    const endTimestamp = parseInt(req.query.endTimestamp as string, 10);
    await populateDb(conn, startTimestamp, endTimestamp)
      .then(() => res.send("Database populated successfully"))
      .catch((error) =>
        res.status(500).send(`Error populating database: ${error.message}`)
      );
  });

  // Get Transactions
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
