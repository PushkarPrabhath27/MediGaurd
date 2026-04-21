# MediGuard



<p align="center">
  Predictive maintenance, reliability intelligence, and operational visibility for medical equipment fleets.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-0f766e?style=for-the-badge" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/frontend-Next.js_16-111827?style=for-the-badge" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/backend-Go-0b7285?style=for-the-badge" alt="Go backend" />
  <img src="https://img.shields.io/badge/database-PostgreSQL-1d4ed8?style=for-the-badge" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/cache-Redis-dc2626?style=for-the-badge" alt="Redis" />
</p>

## Why MediGuard

Healthcare operations depend on devices that cannot fail quietly. MediGuard is a multi-tenant platform designed for hospitals, diagnostic centers, and biomedical engineering teams that need earlier visibility into equipment risk, clearer maintenance coordination, and stronger operational reporting.

The product brings together:

- equipment inventory and department-level visibility
- predictive failure scoring and health insights
- maintenance workflow tracking
- leadership-ready analytics dashboards
- tenant-aware access patterns for multi-organization deployments

## Product Snapshot

### Core capabilities

- Risk-aware equipment monitoring for high-value clinical assets
- Prediction and health-score workflows that surface likely failures earlier
- Maintenance and work-order support for operational follow-through
- Dashboard reporting for fleet reliability and executive oversight
- Redis-backed alerting foundation for real-time extensions
- Docker and Kubernetes deployment assets for local and cloud environments

### Intended users

- Biomedical engineering teams
- Hospital operations leaders
- Clinical asset managers
- Technical teams building healthcare reliability tooling

## Demo

- [Product demo video](docs/assets/MediGuardDemo.mp4)

If your GitHub client supports embedded HTML video, you can also preview it inline:

<video src="docs/assets/MediGuardDemo.mp4" controls width="100%"></video>

## Architecture

### Frontend

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

### Backend

- Go
- Chi router
- SQLX
- JWT authentication

### Platform services

- PostgreSQL
- Redis
- Docker Compose
- Kubernetes manifests

## Repository Layout

```text
mediguard/
|-- backend/               Go API, migrations, seed data, and domain modules
|-- frontend/              Next.js application
|-- docs/assets/           README visuals and demo media
|-- k8s/                   Deployment manifests
|-- .github/               CI workflow, templates, and GitHub metadata
|-- docker-compose.yml     Local multi-service development stack
|-- .env.example           Example local environment configuration
`-- README.md
```

## Application Areas

### Backend domains

- `auth`: authentication and tenant-aware access
- `tenant`: tenant metadata and scoping
- `equipment`: equipment inventory and operational metadata
- `analytics`: summary metrics and reporting endpoints
- `prediction`: failure-risk and health-score logic
- `workorder`: maintenance workflow records
- `alert`: notification service groundwork

### Frontend routes

- `/`: marketing and product overview
- `/login`: demo authentication entry point
- `/dashboard`: operational overview
- `/dashboard/equipment`: asset inventory
- `/dashboard/maintenance`: maintenance workflow surface
- `/dashboard/predictions`: predictive risk views
- `/dashboard/analytics`: reporting and analytics

## Quick Start

### Prerequisites

- Node.js 18 or later
- npm
- Go 1.25 or later
- PostgreSQL
- Redis

### 1. Clone the repository

```bash
git clone https://github.com/PushkarPrabhath27/MediGaurd
cd mediguard
```

### 2. Configure environment variables

Copy the example file and adjust values for your local setup:

```bash
cp .env.example .env
```

Key backend variables:

- `DATABASE_URL`
- `REDIS_ADDR`
- `REDIS_PASSWORD`
- `JWT_SECRET`
- `PORT`

Frontend variable:

- `NEXT_PUBLIC_API_URL`

### 3. Start infrastructure

For local development with containers:

```bash
docker compose up -d postgres redis
```

### 4. Start the backend

```bash
cd backend
go run ./cmd/server
```

The API health endpoint is available at `http://localhost:8080/health`.

### 5. Seed demo data

```bash
cd backend
go run seed.go
```

Demo credentials:

- Tenant slug: `city-general`
- Email: `admin@citygeneral.com`
- Password: `password123`

### 6. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The web app is available at `http://localhost:3000`.

## Full Docker Workflow

To boot the full stack with one command:

```bash
docker compose up --build
```

Included services:

- PostgreSQL
- Redis
- Backend API
- Frontend app

## Local Validation

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
go test ./...
```

## Deployment Notes

This repository already includes Dockerfiles and Kubernetes manifests, making it a strong starting point for a hosted deployment. Before production use, plan to add:

- managed secrets and credential rotation
- observability for prediction execution and service health
- production-grade logging, tracing, and alerting
- CI/CD environment promotion and release controls
- deeper security review for medical or regulated environments

## GitHub Standards

The repository includes supporting files for a polished collaboration workflow:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)
- [Pull request template](.github/pull_request_template.md)

## License

Released under the [MIT License](LICENSE).
