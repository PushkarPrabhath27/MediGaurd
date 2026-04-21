# Contributing to MediGuard

Thank you for contributing to MediGuard. This repository is intended to demonstrate strong engineering discipline as well as product quality, so contributions should improve both functionality and maintainability.

## Principles

- Prioritize clarity over cleverness.
- Preserve a professional product experience across backend and frontend work.
- Keep commits focused and easy to review.
- Treat reliability, patient-impacting workflows, and security-sensitive paths with extra care.

## Getting Started

1. Fork or branch from the latest default branch.
2. Read the [README](README.md) for project setup and local development instructions.
3. Seed the local environment if you need demo authentication data.
4. Make changes in small, reviewable increments.

## Development Expectations

### Frontend

- Maintain a polished, intentional user experience.
- Avoid placeholder-feeling UI when a clearer product workflow can be shown.
- Run:

```bash
cd frontend
npm run lint
npm run build
```

### Backend

- Keep handlers, services, and repositories consistent with existing structure.
- Favor explicit error handling and clear API responses.
- Run:

```bash
cd backend
go test ./...
```

## Pull Request Guidelines

Please make sure your pull request:

- has a clear and specific title
- explains what changed and why
- notes any setup, migration, or environment changes
- includes screenshots or short video captures for UI work when relevant
- avoids unrelated formatting churn

## Code Style

- Follow existing naming and module conventions.
- Prefer readable, production-appropriate defaults.
- Do not commit secrets, local environment files, or generated artifacts.

## Reporting Issues

When opening an issue or bug report, include:

- what you expected to happen
- what actually happened
- steps to reproduce
- relevant environment details
- screenshots or logs when useful

## Security

If you discover a security issue, please follow the guidance in [SECURITY.md](SECURITY.md) instead of opening a public issue immediately.
