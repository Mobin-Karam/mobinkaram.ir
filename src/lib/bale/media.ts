import { CHANNEL, TOKEN } from "./config";

export async function sendPhoto(file: File, caption: string) {
  if (!TOKEN) throw new Error("Missing BALE_BOT_TOKEN");
  if (!CHANNEL) throw new Error("Missing BALE_CHANNEL");
  const form = new FormData();

  form.append("chat_id", CHANNEL);
  form.append("photo", file);
  form.append("caption", caption);

  const res = await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendPhoto`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(`sendPhoto failed: ${res.status}`);
  }

  return res.json();
}

export async function sendVideo(file: File, caption: string) {
  if (!TOKEN) throw new Error("Missing BALE_BOT_TOKEN");
  if (!CHANNEL) throw new Error("Missing BALE_CHANNEL");
  const form = new FormData();

  form.append("chat_id", CHANNEL);
  form.append("video", file);
  form.append("caption", caption);

  const res = await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendVideo`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(`sendVideo failed: ${res.status}`);
  }

  return res.json();
}
