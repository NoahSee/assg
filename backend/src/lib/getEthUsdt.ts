import axios from "axios";

export function genUrl(startTime: number, endTime: number): string {
  return `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${startTime}&endTime=${endTime}&limit=1000`;
}

export function parseResponse(response: any): string {
  if (response.status === 200) {
    return response.data as string;
  } else {
    throw new Error(`Error: ${response.data.message}`);
  }
}

export default async function getEthUsdt(
  startTime: number,
  endTime: number
): Promise<string> {
  console.log("getEthUsdt", startTime, endTime);
  const url = genUrl(startTime, endTime);

  try {
    const response = await axios.get(url);
    return parseResponse(response);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// ... existing code ...
