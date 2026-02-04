# Testing Guide

This repository contains two projects:

- `automation-engineer-test-be` (backend API)
- `automation-engineer-test-fe` (frontend UI)

## Local Test Runs

### Backend API (Postman/Newman)

From `automation-engineer-test-be`:

1. Install dependencies (if needed)
   - `npm install`
2. Install Newman (one-time)
   - `npm install -g newman newman-reporter-htmlextra`
   - Or run with `npx newman` without global install
3. Run the collection with Newman (PowerShell)
   - `newman run postman/ShiftManager.postman_collection.json \``
   - `  -e postman/ShiftManager.postman_environment.json \``
   - `  -r cli,htmlextra \``
   - `  --reporter-htmlextra-export newman/report.html`
4. Run the collection with Newman (cmd.exe)
   - `newman run postman/ShiftManager.postman_collection.json ^`
   - `  -e postman/ShiftManager.postman_environment.json ^`
   - `  -r cli,htmlextra ^`
   - `  --reporter-htmlextra-export newman/report.html`

Notes:
- The collection generates dynamic users, so no seeded worker user is required.
- Set `baseUrl` in the environment file or override it with `--env-var baseUrl=...`.

### Frontend UI (Cypress)

From `automation-engineer-test-fe`:

1. Install dependencies
   - `npm install`
2. Start the frontend (and backend API if testing against local)
   - `npm run dev`
3. Run Cypress
   - Interactive: `npm run cy:open`
   - Headless: `npm run cy:run`

Optional environment variables:
- `CYPRESS_BASE_URL` (default `http://localhost:5173`)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`

## CI Workflow

The backend repo includes a GitHub Actions workflow at:

- `automation-engineer-test-be/.github/workflows/api-tests.yml`

Behavior:
- Runs on every pull request affecting backend or Postman assets.
- Installs Newman, executes the Postman collection, and exports an HTML report.
- Uploads the Newman report as a workflow artifact.

## Key Design Decisions

- **Dynamic test data**: Postman collection creates users at runtime to avoid reliance on seeded data.
- **Token separation**: Admin, worker, and non-admin tokens are stored as separate collection variables.
- **Stable UI selectors**: Cypress uses `data-testid` attributes to avoid brittle selectors.
- **Page Object Model**: Cypress tests are organized with `pages/` for reusability and clarity.
