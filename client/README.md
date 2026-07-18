# PlantPal AI Frontend

PlantPal AI is a prototype virtual assistant for plant-care guidance.

## Features

- Modern landing page for project demo
- PDF knowledge upload flow
- Configurable assistant instructions
- Live AI chat UI connected to backend APIs

## Run locally

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Environment

Create `.env.local` in `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend dependency

Make sure the backend server is running on port `5000` before using upload/chat pages.
