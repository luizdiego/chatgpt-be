import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1)
});

export const ChatRequestBodySchema = z.object({
  messages: z.array(ChatMessageSchema).min(1)
});

export const ChatScaffoldResponseSchema = z.object({
  reply: z.string(),
  receivedMessages: z.number().int().nonnegative()
});

export const ErrorResponseSchema = z.object({
  error: z.string()
});

export type ChatRequestBody = z.infer<typeof ChatRequestBodySchema>;
