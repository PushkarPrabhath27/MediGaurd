# 🏥 MediGuard

**AI-Driven Medical Equipment Failure Prediction & Management Platform**

MediGuard is a multi-tenant SaaS platform built for hospitals and diagnostic labs to proactively predict medical equipment failures before they happen. By transitioning from a reactive to a predictive maintenance model, MediGuard helps healthcare facilities reduce equipment downtime, optimize maintenance costs, and ultimately protect patient lives.

## 🚀 Key Features

- **Predictive Maintenance:** AI-driven health scoring (0-100) and failure prediction for critical medical devices based on historical patterns.
- **Equipment Registry:** Comprehensive management system with QR code generation for instant device health checks.
- **Automated Work Orders:** SLA-backed automated ticketing system for biomedical engineers.
- **Real-Time Alerts:** Redis Pub/Sub powered instant notifications for critical equipment states.
- **Multi-Tenant Architecture:** Secure, isolated environments allowing multiple hospital branches to operate under one platform.
- **Analytics Dashboard:** Insights into Mean Time Between Failures (MTBF), maintenance costs, and AMC renewals.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend:** Go (Golang) Microservices, `net/http` + `chi` router
- **Database:** PostgreSQL 15
- **Caching & Pub/Sub:** Redis 7
- **Infrastructure:** Docker, Kubernetes (AKS ready)

## 📦 Getting Started

### Prerequisites
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+

### Quick Start (Docker)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mediguard.git
   cd mediguard
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Spin up the infrastructure and services:
   ```bash
   docker-compose up -d
   ```

4. The platform will be available at:
   - Frontend: `http://localhost:3000`
   - API Gateway: `http://localhost:8080`

## 🗄️ Project Structure
```text
mediguard/
├── backend/          # Go microservices (Auth, Equipment, Maintenance, etc.)
├── frontend/         # Next.js web application
├── k8s/              # Kubernetes deployment manifests
├── .github/          # GitHub Actions CI/CD workflows
└── docker-compose.yml
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
