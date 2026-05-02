import { NextResponse } from "next/server";

import {
  ChatRequestBodySchema,
  ChatScaffoldResponseSchema,
  ErrorResponseSchema
} from "@/lib/schemas/chat";

export async function POST(request: Request) {
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

  // Placeholder response until OpenAI provider wiring is added.
  return NextResponse.json(
    ChatScaffoldResponseSchema.parse({
      reply: "Chat endpoint scaffolded. Integrate your provider in this route.",
      receivedMessages: parsed.data.messages.length
    }),
    { status: 501 }
  );
}
