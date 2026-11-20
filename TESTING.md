# Tristan Web-First — proof receipt / static prototype

This is a public-facing, dependency-free static proof portal. It has no account access, background jobs, connected credentials, or operational sync. The "candidate" labels are design candidates, not runtime claims.

## Local verification

1. `python3 -m http.server 8765`
2. Open `http://localhost:8765/`
3. Search for "Jarvis" and switch to the "Candidats" filter.
4. Select **Lancer les autotests** (6/6 should pass).
5. Select **Exporter le manifeste JSON** and verify `productionQualified: false`.

## Promotion gates

Feature branch → PR to `main` → independent CI tests → staging / preview readback → authorized production promotion. The site's existing `PRODUCTION_MANIFEST.json` and `REPO_GENOME.json` remain authoritative. No action in this PR changes the `production` branch, creates a background agent, or confers authority to access private data.

## Reuse policy

Evaluate established web hosting and durable workflow engines before authoring custom orchestration. Run experimental Jarvis/Axiome features as parallel candidates, with explicit read-only permissions, canary, proof receipts, and rollback.