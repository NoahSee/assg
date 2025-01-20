import axios from "axios";

export default async function getBlockByTimestamp(
  timestamp: number
): Promise<number> {
  console.log("getBlockByTimestamp", timestamp);
  const apiKey = "GIUKDAANZ9BY6GXXYNM8RSSB3JWZNTY4FA";
  const url = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${
    timestamp / 1000000
  }&closest=before&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "1") {
      return Number(response.data.result);
    } else {
      throw new Error(`Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error fetching block number:", error);
    throw error;
  }
}

// npx ts-node backend/src/lib/getBlockByTimestamp.ts
// (async () => {
//   const testTimestamp = new Date("2023-01-01").getTime(); // Example timestamp
//   try {
//     const blockNumber = await getBlockByTimestamp(testTimestamp);
//     console.log(`Block number for timestamp ${testTimestamp}: ${blockNumber}`);
//   } catch (error) {
//     console.error("Test failed:", error);
//   }
// })();
