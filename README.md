#### Languages:  
[English](./README.md) | [Русский](./README.ru.md) | [Español](./README.es.md)

---

# CV Frontend Service

Frontend application for the CV (Curriculum Vitae) service, built with React and Chakra UI.
Designed for visualizing user profiles, managing professional experience, and interacting with the CV Backend Service.

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

To run the project locally, follow these steps:

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

The project is under active development. Below are possible directions for further improvement and growth:

### 1. UI Enhancements
- **Profile Editing:** Full interface for creating and editing user data (currently under development).
- **PDF Export:** Ability to generate and download CVs in PDF format directly from the browser.
- **Animations:** Adding smooth transitions and micro-interactions using Framer Motion.

### 2. Functionality
- **Search and Filtering:** Advanced filters in the profile catalog by skills and experience.
- **Localization (i18n):** Support for UI language switching.
- **Dark/Light Themes:** Further polishing components for perfect display in both modes (Chakra UI 3 Color Mode).

### 3. Code Quality and Testing
- **Unit Tests:** Component test coverage using Vitest and React Testing Library.
- **E2E Tests:** Integration tests using Playwright or Cypress.
- **TypeScript:** Migration to TypeScript for increased reliability and better DX.

### 4. Observability and Analytics
- **Error Tracking:** Integration with Sentry for client-side error tracking.
- **Performance Monitoring:** Monitoring Core Web Vitals.