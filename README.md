# Real-Time Issue Tracker

Real-Time Issue Tracker is a full-stack issue management platform built with a TypeScript backend, a Next.js frontend, PostgreSQL, Kafka, and Slack integrations. The final product is designed to support real-time issue intake, status tracking, and operational visibility through a web dashboard and event-driven backend services.

## What the final version includes

- A Next.js 16 frontend with an issue dashboard, issue list views, and issue detail pages.
- A TypeScript/Express backend with REST APIs for creating, reading, updating, and deleting issues.
- Slack webhook support for creating and managing issues directly from Slack interactions.
- Kafka-based event streaming for issue lifecycle events and asynchronous processing.
- PostgreSQL persistence managed through Prisma for type-safe database access.
- Dockerized local infrastructure for PostgreSQL, Kafka, and Kafka UI.
- A clean service-oriented backend structure that separates controllers, services, repositories, and interfaces.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Prisma
- Messaging: Apache Kafka, KafkaJS
- Integrations: Slack Web API
- DevOps: Docker, Docker Compose

## Project Structure

- `frontend/` - Next.js application for the user interface
- `backend/` - Express API, Slack webhook handlers, Kafka integration, and Prisma models
- `infrastructure/` - Docker Compose file for local infrastructure
- `Makefile` - Convenience commands for running and inspecting the local stack

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- Docker Desktop or Docker Engine with Docker Compose
- A PostgreSQL connection string
- A Slack bot token if you want to test Slack interactions

## Environment Variables

Create a `.env` file in `backend/` with the values your local environment needs.

Example:

```env
DATABASE_URL=postgresql://trace:trace@localhost:5432/trace
KAFKA_BROKER=localhost:29092
SLACK_BOT_TOKEN=xoxb-your-token-here
PORT=4000
```

## Setup

1. Install dependencies for the frontend and backend.

```bash
cd frontend
npm install

cd ../backend
npm install
```

2. Start the local infrastructure.

```bash
cd ..
make up
```

3. Run Prisma database setup from the backend.

```bash
cd backend
npx prisma generate
npx prisma db push
npm run seed
```

## Run the Application

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Access the Services

- Frontend: http://localhost:3000
- Backend health check: http://localhost:4000/health
- Kafka UI: http://localhost:8000
- PostgreSQL: localhost:5432
- Kafka broker: localhost:29092

## Useful Commands

From the repository root:

```bash
make up           # Start PostgreSQL, Kafka, and Kafka UI
make down         # Stop services but keep volumes
make down-v       # Stop services and remove volumes
make logs         # View logs from all services
make logs-kafka   # View Kafka logs only
make logs-postgres # View PostgreSQL logs only
make ps           # Show running containers
make build        # Rebuild the container images
make clean        # Remove containers, networks, and volumes
```

## API Summary

- `GET /api/issues` - List issues
- `GET /api/issues/:id` - Get a single issue
- `POST /api/issues` - Create a new issue
- `PUT /api/issues/:id` - Update an issue
- `DELETE /api/issues/:id` - Delete an issue
- `POST /api/webhooks/slack` - Receive Slack events and interactions

## Notes

- The backend listens on port `4000` by default.
- Docker Compose is configured for local development and runs PostgreSQL, Kafka, and Kafka UI on the same network.
- The application uses a layered architecture so that business logic, persistence, and external integrations remain isolated and testable.