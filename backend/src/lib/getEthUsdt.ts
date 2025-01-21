import axios from "axios";

export default async function getEthUsdt(
  startTime: number,
  endTime: number
): Promise<string> {
  console.log("getEthUsdt", startTime, endTime);
  const url = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${startTime}&endTime=${endTime}&limit=1000
`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as string;
    } else {
      throw new Error(`Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
