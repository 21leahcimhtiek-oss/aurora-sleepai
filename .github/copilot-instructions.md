# Copilot Instructions

## Build, test, and lint commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm ci --legacy-peer-deps || npm install --legacy-peer-deps` from `.github\workflows\ci.yml`
- `npm run typecheck --if-present` from `.github\workflows\ci.yml`
- `npm run check --if-present` from `.github\workflows\ci.yml`
- `npm test --if-present` from `.github\workflows\ci.yml`
- `npm run build --if-present` from `.github\workflows\ci.yml`

## High-level architecture

- Deployment is Vercel-oriented; keep repo instructions aligned with the files and commands used for Vercel builds.

## Key conventions

- Use `.env.example` as the source of truth for configurable services; notable variables include `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, ....

<!-- Generated from repo-local docs/config on 2026-05-18 for 21leahcimhtiek-oss/aurora-sleepai. -->
