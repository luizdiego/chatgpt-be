import { NextResponse } from "next/server";

import {
  ChatRequestBodySchema,
  ChatScaffoldResponseSchema,
  ErrorResponseSchema
} from "@/lib/schemas/chat";

function getBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export async function POST(request: Request) {
  const expectedToken = process.env.CHAT_API_TOKEN;
  const token = getBearerToken(request.headers.get("authorization"));

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      ErrorResponseSchema.parse({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = ChatRequestBodySchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json(
      ErrorResponseSchema.parse({
        error: "Body must include a non-empty messages array."
      }),
      { status: 400 }
    );
  }

  return NextResponse.json(
    ChatScaffoldResponseSchema.parse({
      reply: "Secure chat endpoint scaffolded. Integrate provider logic here.",
      receivedMessages: parsed.data.messages.length
    }),
    { status: 501 }
  );
}
