import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol, start, end } = req.query;

  try {
    const response = await axios.get(
      `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
      {
        params: { start, end, timeframe: "1Day" },
        headers: {
          "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
          "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET!,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Error fetching data from Alpaca; ${error}` });
  }
}