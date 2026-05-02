# chatgpt-be

Backend boilerplate built with Next.js (App Router) focused on API routes.

## Included

- TypeScript + ESLint setup
- Health check endpoint: `GET /api/health`
- Chat endpoint scaffold: `POST /api/chat`
- Secured chat scaffold: `POST /api/chat/secure`
- OpenAPI endpoint: `GET /api/openapi`
- Swagger UI docs: `/docs`
- Environment template: `.env.example`

## Project Structure

```text
src/
  app/
	 api/
		chat/route.ts
		chat/secure/route.ts
		health/route.ts
		openapi/route.ts
	 docs/route.ts
	 layout.tsx
	 page.tsx
  lib/
    openapi.ts
    schemas/chat.ts
```

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

1. Install dependencies:

	```bash
	npm install
	```

2. Copy environment file:

	```bash
	copy .env.example .env
	```

3. Start development server:

	```bash
	npm run dev
	```

4. Test endpoints:

	- `GET http://localhost:3000/api/health`
	- `POST http://localhost:3000/api/chat`
	- `POST http://localhost:3000/api/chat/secure` (requires Bearer token)
	- `GET http://localhost:3000/api/openapi`
	- `http://localhost:3000/docs`

5. Secure endpoint token (example):

	- Set `CHAT_API_TOKEN` in `.env`
	- Send header: `Authorization: Bearer <CHAT_API_TOKEN>`

## Next Step

Wire `src/app/api/chat/route.ts` to the OpenAI API provider and return model responses.
