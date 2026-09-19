import { CHANNEL, PROVIDER_TOKEN } from "./config";

const TOKEN = process.env.BALE_BOT_TOKEN!;

export async function sendInvoice({
  title,
  description,
  amount,
  payload,
}: {
  title: string;
  description: string;
  amount: number;
  payload: string;
}) {
  const res = await fetch(
    `https://tapi.bale.ai/bot${TOKEN}/sendInvoice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHANNEL,
        title,
        description,
        payload,

        provider_token: PROVIDER_TOKEN,

        prices: [
          {
            label: "Donation",
            amount: Math.floor(amount),
          },
        ],
      }),
    }
  );

  const data = await res.json();

  if (!data.ok) {
    console.error("Invoice error:", data);
    throw new Error("Invoice failed");
  }

  return data;
}