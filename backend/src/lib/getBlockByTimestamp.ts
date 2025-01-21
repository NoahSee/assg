import axios from "axios";

export function genUrl(timestamp: number, apiKey: string): string {
  return `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${
    timestamp / 1000000
  }&closest=before&apikey=${apiKey}`;
}

export function parseResponse(response: any): number {
  if (response.data.status === "1") {
    return Number(response.data.result);
  } else {
    throw new Error(`Error: ${response.data.message}`);
  }
}

export default async function getBlockByTimestamp(
  timestamp: number
): Promise<number> {
  console.log("getBlockByTimestamp", timestamp);
  const apiKey = "GIUKDAANZ9BY6GXXYNM8RSSB3JWZNTY4FA";
  const url = genUrl(timestamp, apiKey);

  try {
    const response = await axios.get(url);
    return parseResponse(response);
  } catch (error) {
    console.error("Error fetching block number:", error);
    throw error;
  }
}
