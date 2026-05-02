import { z } from "zod";

import {
  ChatRequestBodySchema,
  ChatScaffoldResponseSchema,
  ErrorResponseSchema
} from "@/lib/schemas/chat";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type OpenApiPathItem = Partial<
  Record<
    HttpMethod,
    {
      summary: string;
      description?: string;
      tags?: string[];
      security?: Array<Record<string, string[]>>;
      requestBody?: unknown;
      responses: Record<string, unknown>;
    }
  >
>;

type OpenApiDocument = {
  openapi: "3.0.3";
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{ url: string; description: string }>;
  tags: Array<{ name: string; description: string }>;
  paths: Record<string, OpenApiPathItem>;
  components: {
    securitySchemes: Record<string, unknown>;
    schemas: Record<string, unknown>;
  };
};

const chatRequestBodyJsonSchema = z.toJSONSchema(ChatRequestBodySchema);

const chatScaffoldResponseJsonSchema = z.toJSONSchema(
  ChatScaffoldResponseSchema
);

const errorResponseJsonSchema = z.toJSONSchema(ErrorResponseSchema);

export const openApiDocument: OpenApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "chatgpt-be API",
    version: "0.1.0",
    description: "OpenAPI specification for the Next.js backend boilerplate."
  },
  servers: [{ url: "http://localhost:3000", description: "Local development" }],
  tags: [
    { name: "Health", description: "Service health and availability checks." },
    { name: "Chat", description: "Chat completion-related endpoints." }
  ],
  paths: {
    "/api/health": {
      get: {
        summary: "Health check",
        tags: ["Health"],
        responses: {
          "200": {
            description: "Backend is healthy.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean", example: true },
                    service: { type: "string", example: "chatgpt-be" },
                    timestamp: { type: "string", format: "date-time" }
                  },
                  required: ["ok", "service", "timestamp"]
                }
              }
            }
          }
        }
      }
    },
    "/api/chat": {
      post: {
        summary: "Chat endpoint scaffold",
        description: "Placeholder endpoint for provider integration.",
        tags: ["Chat"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: chatRequestBodyJsonSchema
            }
          }
        },
        responses: {
          "501": {
            description: "Scaffold response until provider integration is implemented.",
            content: {
              "application/json": {
                schema: chatScaffoldResponseJsonSchema
              }
            }
          },
          "400": {
            description: "Invalid request payload.",
            content: {
              "application/json": {
                schema: errorResponseJsonSchema
              }
            }
          }
        }
      }
    },
    "/api/chat/secure": {
      post: {
        summary: "Secured chat endpoint scaffold",
        description: "Example endpoint protected by Bearer token.",
        tags: ["Chat"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: chatRequestBodyJsonSchema
            }
          }
        },
        responses: {
          "501": {
            description: "Scaffold response until provider integration is implemented.",
            content: {
              "application/json": {
                schema: chatScaffoldResponseJsonSchema
              }
            }
          },
          "400": {
            description: "Invalid request payload.",
            content: {
              "application/json": {
                schema: errorResponseJsonSchema
              }
            }
          },
          "401": {
            description: "Missing or invalid token.",
            content: {
              "application/json": {
                schema: errorResponseJsonSchema
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {}
  }
};
