# MediGuard

> Predictive maintenance and operational intelligence for medical equipment fleets.



[![Frontend](https://img.shields.io/badge/frontend-Next.js%20%26%20React-111827?style=for-the-badge)](#technology-stack)
[![Backend](https://img.shields.io/badge/backend-Go%20%26%20Chi-0f766e?style=for-the-badge)](#technology-stack)
[![Database](https://img.shields.io/badge/database-PostgreSQL-1d4ed8?style=for-the-badge)](#technology-stack)
[![Cache](https://img.shields.io/badge/cache-Redis-dc2626?style=for-the-badge)](#technology-stack)
[![License](https://img.shields.io/badge/license-MIT-16a34a?style=for-the-badge)](LICENSE)

MediGuard is a multi-tenant platform for hospitals, diagnostic centers, and biomedical engineering teams that need to move from reactive maintenance to proactive equipment reliability management. It combines asset visibility, predictive failure scoring, maintenance workflows, and leadership-ready analytics in one product.

## Overview

Modern clinical environments cannot afford downtime on high-value and high-dependency devices such as MRI systems, ventilators, infusion pumps, imaging assets, and diagnostic infrastructure. MediGuard is designed to help operators:

- monitor equipment health across departments
- surface elevated failure risk before disruptions occur
- coordinate maintenance action with operational context
- centralize asset intelligence for clinical engineering teams
- present meaningful performance insights to leadership

## Demo

The repository includes a product demo video:

- [Watch the MediGuard demo video](docs/assets/MediGuardDemo.mp4)

If your GitHub client supports inline HTML video preview, you can also use the player below.

<video src="docs/assets/MediGuardDemo.mp4" controls width="100%"></video>

## Highlights

- Predictive maintenance workflows with health scoring and failure-risk surfacing
- Equipment registry for tracking devices, departments, models, and status
- Maintenance orchestration views for scheduling and service execution
- Analytics dashboards for reliability, department distribution, and operational reporting
- Multi-tenant backend architecture for isolated hospital environments
- Real-time alerting foundations using Redis Pub/Sub
- Kubernetes and Docker deployment assets for local and cloud environments

## Product Experience

The current application includes:

- a polished landing page and login experience
- an executive-style dashboard for reliability monitoring
- equipment inventory views with operational empty states and demo-ready fallback content
- maintenance, predictions, and analytics pages that feel presentation-ready and product-complete
- seeded authentication flow for demo and local evaluation

## Technology Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend

- Go
- Chi router
- SQLX
- JWT-based authentication

### Data and Infrastructure

- PostgreSQL
- Redis
- Docker Compose
- Kubernetes manifests

## Repository Structure

```text
mediguard/
├── backend/             # Go backend, migrations, seed script, and API modules
├── frontend/            # Next.js application and UI
├── k8s/                 # Kubernetes deployment manifests
├── docs/
│   └── assets/          # Demo media and documentation assets
├── .github/             # GitHub repository templates and workflow-ready metadata
├── docker-compose.yml   # Local multi-service orchestration
├── .env.example         # Example environment variables
└── README.md
```

## Core Modules

### Backend domains

- `auth`: login, tenant-aware access, token generation
- `equipment`: inventory retrieval and equipment metadata handling
- `analytics`: dashboard summary and reporting endpoints
- `prediction`: health scoring and prediction logic
- `workorder`: maintenance lifecycle and status transitions
- `alert`: real-time notification groundwork

### Frontend routes

- `/`: landing page
- `/login`: authentication experience
- `/dashboard`: operational overview
- `/dashboard/equipment`: asset registry and inventory workflow
- `/dashboard/maintenance`: service coordination
- `/dashboard/predictions`: predictive maintenance insights
- `/dashboard/analytics`: reliability and executive reporting

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Go 1.21+
- PostgreSQL
- Redis

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd mediguard
```

### 2. Configure environment variables

Create a local `.env` file from the provided example:

```bash
cp .env.example .env
```

Populate the backend variables as needed for your local or hosted services.

### 3. Start the backend

From the `backend` directory:

```bash
go run ./cmd/server
```

The backend reads environment variables such as:

- `DATABASE_URL`
- `REDIS_ADDR`
- `REDIS_PASSWORD`
- `JWT_SECRET`
- `PORT`

### 4. Seed demo data

To create or refresh the demo tenant and administrator account:

```bash
cd backend
go run seed.go
```

Demo credentials:

- Tenant slug: `city-general`
- Email: `admin@citygeneral.com`
- Password: `password123`

### 5. Start the frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

By default, the app will be available at:

- Frontend: `http://localhost:3000`
- Backend health endpoint: `http://localhost:8080/health`

## Docker Compose

You can also use Docker Compose for a local multi-service environment:

```bash
docker compose up --build
```

Services included:

- PostgreSQL
- Redis
- Backend
- Frontend

## Development Notes

- The backend includes SQL migrations under `backend/migrations`
- The seed script is idempotent enough for repeated demo setup
- The frontend includes operational fallback content so the product still feels complete when some datasets are sparse
- Environment-specific values should remain outside the repository and never be committed via `.env`

## Quality Checks

Recommended local validation:

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

## Deployment Direction

This repository already includes:

- Dockerfiles for frontend and backend services
- Kubernetes deployment manifests under `k8s/`
- a structure that can be extended for CI/CD workflows and environment promotion

For production use, recommended next steps include:

- secrets management through a secure vault or platform secret store
- production-grade logging and tracing
- stronger observability around prediction execution and alert delivery
- automated CI pipelines for frontend and backend validation

## Documentation and Repository Standards

Additional repository guidance is provided in:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)

## License

This project is licensed under the [MIT License](LICENSE).
