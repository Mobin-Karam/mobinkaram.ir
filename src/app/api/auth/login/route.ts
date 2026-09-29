import { NextResponse } from "next/server";

import { createSession, setSessionCookie, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const input: unknown = await request.json();
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  const { username, password } = input as Record<string, unknown>;
  if (typeof username !== "string" || typeof password !== "string") return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  try {
    if (!(await verifyCredentials(username, password))) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    await setSessionCookie(await createSession(username));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sign in." }, { status: 500 });
  }
}
