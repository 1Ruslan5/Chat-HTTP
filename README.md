# Simple Chat API

A minimalist HTTP-based chat service built with **Fastify**, **PostgreSQL**, and **Prisma**. Users can register, post text or file messages, list messages with pagination, and fetch raw message content. Basic Authentication protects all message endpoints.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. Database Setup](#2-database-setup)
    - [3. Run in Development](#3-run-in-development)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)

---

## Tech Stack

- **Server**: Fastify (Node.js)
- **Database**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Auth**: Basic Authentication
- **Docs**: OpenAPI (Swagger UI)
- **Package Manager**: pnpm

---

## Project Structure

``` bash
├── docker/                         # Docker-related files
│   └── docker-compose.yml
│
├── prisma/                         # Prisma schema and migrations
│   ├── schema.prisma
│   ├── client.ts
│   └── migrations/
│
├── src/                            # Application source code
│   ├── config/                     # Fastify & Swagger configuration
│   ├── constants/                  # Shared constants (e.g. error codes)
│   ├── controllers/                # Route handlers / controllers
│   ├── db/                         # Database connection setup
│   ├── dtos/                       # TypeBox schemas / DTOs
│   ├── plugins/                    # Fastify plugins (e.g. auth, CORS)
│   ├── repositories/               # Data-access layer (Prisma queries)
│   ├── routes/                     # Route definitions
│   ├── services/                   # Business logic
│   ├── types/                      # TypeScript types
│   ├── uploads/                    # Stored file uploads
│   ├── app.ts                      # Fastify application setup
│   ├── env.ts                      # Environment variable loading
│   └── index.ts                    # Server entry point
│
├── .env                            # Environment variables (not committed)
├── .gitignore                      # Files to ignore in Git
├── .prettierignore                 # Files to ignore in Prettier
├── eslint.config.mjs               # ESLint configuration
├── prettier.config.mjs             # Prettier configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # npm / pnpm metadata & scripts
├── pnpm-lock.yaml                  # pnpm lockfile
└── README.md                       # Project overview and setup instructions
```
---

## Prerequisites

- **Node.js** (>=16)
- **pnpm**
- **Docker** & **Docker Compose**

---

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

Before setup copy `.env` [Environment Variables](#environment-variables)

Start PostgreSQL in Docker:

```bash
pnpm run dev:dkr
```

This will spin up a `postgres` container on `localhost:${DB_PORT}` and initialize the database.

Run Prisma migrations and generate client:

``` bash
pnpm run prisma:generate
pnpm run db:migrate
```

### 3. Run in Development

``` bash
pnpm run start:dev
```

- **Server** listens on `http://${BASE_URL}:${PORT}`
- **Swagger UI** available at `http://${BASE_URL}:${PORT}/docs`

---

## API Endpoints

| Method | Path                          | Auth      | Description                                    |
| ------ | ----------------------------- | --------- | ---------------------------------------------- |
| POST   | `/api/v1/account/register`    | Public    | Register a new user                            |
| POST   | `/api/v1/message/text`        | BasicAuth | Create a text message                          |
| POST   | `/api/v1/message/file`        | BasicAuth | Upload a file message (multipart/form-data)    |
| GET    | `/api/v1/message/list`        | BasicAuth | List messages with pagination                  |
| GET    | `/api/v1/message/content/:id` | BasicAuth | Fetch raw message content (text/plain or file) |

See the **Swagger UI** at `/docs` for full request/response schemas and try-it-out.

---

## Environment Variables

Copy `.env` and fill in values:

``` dotenv
BASE_URL=localhost
PORT=3000

  

#Database(Postgresql)
DATABASE_URL=postgresql://postgres:postgrespass@localhost:5432/chat?schema=public

DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgrespass
DB_NAME=chat
```

---
