# Security Policy

## Supported Use

This repository is a project codebase and should not be treated as production-hardened medical infrastructure without further review, testing, and operational controls.

## Reporting a Vulnerability

If you identify a security issue, please do not open a public issue with exploit details.

Instead, report it privately with:

- a concise description of the issue
- affected component or file paths
- reproduction steps or proof of concept
- impact assessment
- any suggested mitigation

Use the private support path documented in [SUPPORT.md](SUPPORT.md).

## What to Expect

After a report is received:

1. The issue will be reviewed and triaged.
2. Severity and impact will be assessed.
3. A mitigation or fix plan will be prepared.
4. Disclosure timing will be coordinated when appropriate.

## Sensitive Areas

Please pay special attention to:

- authentication and token handling
- tenant isolation
- environment variable and secret management
- database access paths
- Redis connectivity and real-time channels
- deployment manifests and exposed infrastructure settings
