import { CHANNEL } from "../baleRequest";

export async function sendPhotoToBale({
  file,
  caption,
}: {
  file: File;
  caption: string;
}) {
  const form = new FormData();

  form.append("chat_id", CHANNEL);
  form.append("caption", caption);
  form.append("photo", file);

  const res = await fetch(
    `https://tapi.bale.ai/bot${process.env.BALE_BOT_TOKEN}/sendPhoto`,
    {
      method: "POST",
      body: form,
    }
  );

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.description || "Photo send failed");
  }

  return data;
}