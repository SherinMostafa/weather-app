# Weather App

A modern weather application built with [Next.js](https://nextjs.org), featuring real-time weather, favorites, and city search. Includes a professional Cypress end-to-end (E2E) testing setup.

## Features
- Current weather and 5-day forecast for your location or any city
- Save/unsave favorite cities
- Responsive, accessible UI
- Robust error and loading state handling
- **Cypress E2E tests** for all major user flows

## Getting Started

### 1. Install dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Run the development server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Cypress End-to-End Testing

### 1. Start the Next.js app
You must have the app running for E2E tests:
```bash
pnpm dev
```

### 2. Run Cypress
Open the Cypress UI:
```bash
pnpm exec cypress open
```
Or run tests headlessly:
```bash
pnpm exec cypress run
```

## Project Structure
- `src/app/` - Main Next.js app code
- `src/components/` - UI and feature components
- `cypress/` - Cypress tests, support, and fixtures

---

## Notes
- Ensure you are using **Node.js 20.x or 18.x** (Cypress does not support Node.js 21+ as of 2024)
- Update the `baseUrl` in `cypress.config.ts` if your dev server runs on a different port

---

## License
MIT
