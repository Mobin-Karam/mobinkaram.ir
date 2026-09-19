export const TOKEN = process.env.BALE_BOT_TOKEN!;
export const CHANNEL = process.env.BALE_CHANNEL!;

export async function baleRequest(
  endpoint: string,
  body: any
) {
  const res = await fetch(
    `https://tapi.bale.ai/bot${TOKEN}/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.description || "Bale error");
  }

  return data;
}