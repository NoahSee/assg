import axios, { AxiosResponse } from "axios";

// Define the type for the response data
interface EtherscanResponse {
  status: string;
  message: string;
  result: any;
}

export default async function getTransactions(
  fromBlock: number,
  toBlock: number
): Promise<EtherscanResponse> {
  console.log("getTransactions", fromBlock, toBlock);
  const url = "https://api.etherscan.io/api";
  const params = {
    module: "logs",
    action: "getLogs",
    address: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
    fromBlock: fromBlock,
    toBlock: toBlock,
    page: 1,
    offset: 10000,
    apikey: "GIUKDAANZ9BY6GXXYNM8RSSB3JWZNTY4FA",
  };

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response: AxiosResponse<EtherscanResponse> = await axios.get(url, {
        params,
      });
      return response.data.result;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error fetching logs:`, error);
      if (attempt >= maxRetries) {
        throw error;
      }
    }
  }
  throw new Error("Failed to fetch transactions after multiple attempts.");
}
