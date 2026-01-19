#### Languages:
[English](./README.md) | [Русский](./README.ru.md) | [Español](./README.es.md)

---

# CV Frontend Service

Frontend application for the CV (Curriculum Vitae) service, built with React and Chakra UI.
Designed for visualizing user profiles, editing profile data, browsing the public catalog, and interacting with the CV Backend Service.

---

## 🛠 Technology Stack

- **Library:** React 19
- **Build Tool:** Vite 7
- **UI Framework:** Chakra UI 3
- **State Management:** Zustand
- **Routing:** React Router 7
- **Icons:** React Icons
- **HTTP Client:** Native Fetch (with custom apiFetch wrapper)
- **Linting:** ESLint

---

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run dev
```
The application will be available at: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration

Settings are managed via environment variables in the `.env` file.

Main parameters:
- `VITE_API_BASE_URL`: Backend service URL (defaults to `http://localhost:8080`). Used for proxying `/api` requests during development.

---

## 📈 Potential Improvements (Backlog)

The project is in an active, but portfolio-oriented state.

### 1. UI Enhancements
- **Animations:** Adding optional transitions and micro-interactions (e.g. Framer Motion).

### 2. Functionality
- **Localization (i18n):** UI language switching.
- **Theme Polishing:** Further refinement of dark/light mode behavior in Chakra UI 3.

### 3. Code Quality and Testing
- **Unit Tests:** Component-level tests using Vitest and React Testing Library.
- **E2E Tests:** End-to-end scenarios using Playwright or Cypress.
- **TypeScript:** Gradual migration from JavaScript to TypeScript.

### 4. Observability and Analytics
- **Error Tracking:** Client-side error tracking (e.g. Sentry).
- **Performance Monitoring:** Monitoring Core Web Vitals.