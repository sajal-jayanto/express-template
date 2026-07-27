# Template Service

A minimal TypeScript/Express starter service with MikroORM (PostgreSQL), Pino logging, and migrations pre-wired.

## Stack

- **Express 5** — HTTP server
- **MikroORM** (`@mikro-orm/postgresql`) — database access
- **PostgreSQL** — via Docker Compose
- **node-pg-migrate** — SQL migrations
- **Pino** — structured logging
- **TypeScript**, **ESLint**, **Prettier**

## Prerequisites

- Node.js
- Docker (for the local Postgres database)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and adjust as needed:

   ```bash
   cp .env.example .env
   ```

3. Start the database:

   ```bash
   docker run -d \
     --name template_db \
     -e POSTGRES_USER=root \
     -e POSTGRES_PASSWORD=root \
     -e POSTGRES_DB=sample \
     -p 5432:5432 \
     -v $(pwd)/data/postgres:/var/lib/postgresql \
     postgres:18-alpine
   ```

   Match `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` to your `.env`'s `DB_USER` / `DB_PASSWORD` / `DB_NAME` if you changed them.

4. Run migrations:

   ```bash
   npm run migrate:up
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

The server starts on `http://localhost:8000` (or the `PORT` set in `.env`).

## Scripts

| Script                   | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start the server in watch mode (tsx)     |
| `npm run build`          | Compile TypeScript to `dist/`            |
| `npm start`              | Run the compiled server from `dist/`     |
| `npm run lint`           | Lint the codebase                        |
| `npm run format`         | Format the codebase with Prettier        |
| `npm run format:check`   | Check formatting without writing changes |
| `npm run migrate:create` | Create a new SQL migration file          |
| `npm run migrate:up`     | Run pending migrations                   |
| `npm run migrate:down`   | Roll back the last migration             |

## Project Structure

```
src/
  app.ts                  # Express app setup (middleware, routes)
  server.ts               # Entry point — connects to DB and starts the server
  config/                 # Env config, logger, MikroORM config
  db/                     # MikroORM initialization
  entities/               # MikroORM entities
  repository/             # Data access layer
  service/                # Business logic
  routes/                 # Express routers
  middlewares/            # Error handling, request logging, etc.
migrations/                # SQL migration files (node-pg-migrate)
```

## API

- `GET /health` — health check, returns status and process uptime
- `GET /sample` — list all samples
- `GET /sample/:id` — get a sample by id
- `POST /sample` — create a sample (body: `{ "text": string }`)
- `PUT /sample/:id` — update a sample (body: `{ "text": string }`)
- `DELETE /sample/:id` — delete a sample

## Environment Variables

See [.env.example](.env.example) for the full list, including `PORT`, `NODE_ENV`, and database connection settings (`DB_*` / `PG*`).
