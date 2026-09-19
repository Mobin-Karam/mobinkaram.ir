import { TOKEN } from "./config";

export async function baleRequest(endpoint: string, body: any) {
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

  if (!res.ok || !data.ok) {
    throw new Error(data.description || "Bale API error");
  }

  return data;
}