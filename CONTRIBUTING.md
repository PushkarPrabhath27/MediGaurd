# Contributing to MediGuard

Thank you for helping improve MediGuard. This project aims to present both strong engineering practice and a polished product experience, so contributions should raise the quality bar in code, documentation, and usability.

## Contribution Principles

- Prefer clarity, correctness, and maintainability over clever implementation.
- Protect the product experience across both frontend and backend changes.
- Keep pull requests focused, reviewable, and well-explained.
- Treat reliability, tenant isolation, and security-sensitive paths with extra care.
- Document behavior changes that affect setup, workflows, or operations.

## Before You Start

1. Review the [README](README.md) for architecture and setup.
2. Sync from the latest default branch before starting work.
3. Create a focused branch for your change.
4. Seed demo data locally if you need the authenticated flows.

## Development Standards

### Frontend

- Preserve a clean, professional interface and avoid placeholder-grade UX.
- Keep copy, spacing, and empty states intentional.
- Validate your changes before opening a PR:

```bash
cd frontend
npm run lint
npm run build
```

### Backend

- Keep handlers, repositories, and service boundaries consistent with the existing structure.
- Favor explicit errors, predictable API behavior, and readable SQL or data access logic.
- Validate backend work locally:

```bash
cd backend
go test ./...
```

## Pull Request Expectations

Each pull request should:

- use a clear, specific title
- explain what changed and why it matters
- call out setup, schema, or environment changes
- include screenshots or a short recording for UI-impacting work
- avoid unrelated cleanup mixed into the same branch

## Commit and Review Hygiene

- Keep commits intentional and easy to follow.
- Do not commit secrets, `.env` files, build output, or machine-specific artifacts.
- If the change is large, break it into smaller reviewable units where possible.
- Mention follow-up work explicitly instead of leaving reviewers to infer it.

## Issue Reporting

When reporting a bug, include:

- expected behavior
- actual behavior
- clear reproduction steps
- runtime or environment details
- logs, screenshots, or videos when helpful

## Security

For security concerns, do not open a public issue with sensitive details. Follow the process in [SECURITY.md](SECURITY.md).
