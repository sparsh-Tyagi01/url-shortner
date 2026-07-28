# URL Shortener

A tiny URL shortener built with Node.js, Express and MongoDB.

## Features
- Create a short id for any URL
- Redirect from short id to original URL
- Basic analytics (visit timestamps)

## Tech
- Node.js
- Express
- MongoDB (Mongoose)
- nanoid for short id generation

## Requirements
- Node.js (v16+ recommended)
- A running MongoDB instance or MongoDB Atlas URI

## Setup
1. Clone the repo

```bash
git clone https://github.com/sparsh-Tyagi01/url-shortner.git
cd url-shortner
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with the following variables:

```
PORT=3000
MONGO_URI=<your-mongo-connection-string>
```

4. Start the app (development)

```bash
npm start
```

The app listens on the port defined by `PORT` in `.env` and will connect to the database using `MONGO_URI`.

## API

- Create short URL

  - Endpoint: `POST /url`
  - Body: `{ "url": "https://example.com" }`
  - Response: `{ "id": "<shortId>" }`

- Get analytics

  - Endpoint: `GET /url/analytics/:shortId`
  - Response: `{ "totalClicks": <number>, "analytics": [ { timestamp } ] }`

- Redirect (public)

  - Endpoint: `GET /:shortId`
  - Behavior: redirects to the original URL and records a visit timestamp

## Project files

- index.js — app entry and route mounting
- connect.js — MongoDB connection helper
- routes/url.js — API routes for creating and fetching analytics
- controllers/url.js — request handlers (create, redirect, analytics)
- models/url.js — Mongoose schema for stored URLs

## Notes
- The project uses `nanoid` to generate short ids.
- `nodemon` is used in `npm start` for development auto-reload.

If you'd like, I can add examples, Docker support, or expand the API documentation.
