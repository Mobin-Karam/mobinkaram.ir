const TOKEN = process.env.BALE_BOT_TOKEN;
const CHANNEL = process.env.BALE_CHANNEL;
const PROVIDER_TOKEN = process.env.BALE_PROVIDER_TOKEN;

if (!TOKEN) throw new Error("Missing BALE_BOT_TOKEN");
if (!CHANNEL) throw new Error("Missing BALE_CHANNEL");

export { TOKEN, CHANNEL, PROVIDER_TOKEN };