import express from "express";
import axios from "axios";

const PORT: number = Number(process.env.PORT) || 3000;
const API_DOMAIN = "https://api.line.me";
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
};
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

type Timezone =
  | "ETC_GMT_MINUS_12"
  | "ETC_GMT_MINUS_11"
  | "PACIFIC_HONOLULU"
  | "AMERICA_ANCHORAGE"
  | "AMERICA_LOS_ANGELES"
  | "AMERICA_PHOENIX"
  | "AMERICA_CHICAGO"
  | "AMERICA_NEW_YORK"
  | "AMERICA_CARACAS"
  | "AMERICA_SANTIAGO"
  | "AMERICA_ST_JOHNS"
  | "AMERICA_SAO_PAULO"
  | "ETC_GMT_MINUS_2"
  | "ATLANTIC_CAPE_VERDE"
  | "EUROPE_LONDON"
  | "EUROPE_PARIS"
  | "EUROPE_ISTANBUL"
  | "EUROPE_MOSCOW"
  | "ASIA_TEHRAN"
  | "ASIA_TBILISI"
  | "ASIA_KABUL"
  | "ASIA_TASHKENT"
  | "ASIA_COLOMBO"
  | "ASIA_KATHMANDU"
  | "ASIA_ALMATY"
  | "ASIA_RANGOON"
  | "ASIA_BANGKOK"
  | "ASIA_TAIPEI"
  | "ASIA_TOKYO"
  | "AUSTRALIA_DARWIN"
  | "AUSTRALIA_SYDNEY"
  | "ASIA_VLADIVOSTOK"
  | "ETC_GMT_PLUS_12"
  | "PACIFIC_TONGATAPU";
interface Coupon {
  title: string;
  description?: string;
  acquisitionCondition: {
    type: "normal" | "lottery";
    lotteryProbability?: number;
    maxAcquireCount?: number;
  };
  maxUseCountPerTicket: number;
  startTimestamp: number;
  endTimestamp: number;
  timezone: Timezone;
  reward: {
    type: "discount" | "free" | "gift" | "cashBack" | "others";
    priceInfo?: {
      type: "fixed" | "percentage" | "explicit";
      fixedAmount?: number;
      percentage?: number;
      originalPrice?: number;
      priceAfterDiscount?: number;
    };
  };
}
app.get("/create-coupon", async (req, res) => {
  try {
    const requestBody = {
      title: "お試しクーポン",
      acquisitionCondition: {
        type: "normal",
      },
      maxUseCountPerTicket: 1,
      startTimestamp: 0,
      endTimestamp: 1756643318,
      timezone: "ASIA_TOKYO",
      reward: {
        type: "free",
      },
      visibility: "UNLISTED",
    };
    const result = await axios.post(
      `${API_DOMAIN}/v2/bot/coupon`,
      requestBody,
      {
        headers: HEADERS,
      }
    );
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// リスナーの設定
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
