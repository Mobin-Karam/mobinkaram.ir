import { CHANNEL } from "../baleRequest";

export async function sendVideoToBale({
  file,
  caption,
}: {
  file: File;
  caption: string;
}) {
  const form = new FormData();

  form.append("chat_id", CHANNEL);
  form.append("caption", caption);
  form.append("video", file);

  const res = await fetch(
    `https://tapi.bale.ai/bot${process.env.BALE_BOT_TOKEN}/sendVideo`,
    {
      method: "POST",
      body: form,
    }
  );

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.description || "Video send failed");
  }

  return data;
}