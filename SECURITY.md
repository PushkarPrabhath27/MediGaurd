# Security Policy

## Supported Use

MediGuard is a project repository and reference implementation. It should not be treated as production-ready medical infrastructure without additional hardening, security review, compliance work, and operational controls.

## Reporting a Vulnerability

Please do not open a public issue containing exploit details.

Instead, report security concerns privately and include:

- a concise summary of the issue
- affected components or file paths
- reproduction steps or proof of concept
- potential impact
- suggested mitigation, if available

Use the private reporting path described in [SUPPORT.md](SUPPORT.md).

## Triage Process

After a report is received, maintainers will:

1. review and triage the report
2. assess severity and impact
3. prepare or prioritize a mitigation plan
4. coordinate disclosure timing when appropriate

## Areas of Particular Interest

- authentication and session or token handling
- tenant isolation and authorization boundaries
- database access and migration safety
- environment variables, secrets, and credential handling
- Redis-backed messaging or alert pathways
- container and Kubernetes deployment configuration
