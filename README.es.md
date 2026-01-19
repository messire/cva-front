#### Idiomas:
[English](./README.md) | [Русский](./README.ru.md) | [Español](./README.es.md)

---

# CV Frontend Service

Aplicación frontend para el servicio de CV (Curriculum Vitae), construida con React y Chakra UI.
Diseñada para visualizar y editar perfiles, navegar por el catálogo público e interactuar con el Backend del servicio CV.

---

## 🛠 Stack Tecnológico

- **Librería:** React 19
- **Build Tool:** Vite 7
- **Framework UI:** Chakra UI 3
- **Gestión de estado:** Zustand
- **Routing:** React Router 7
- **Iconos:** React Icons
- **Cliente HTTP:** Native Fetch (con wrapper apiFetch)
- **Linting:** ESLint

---

## 🚀 Inicio rápido

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Build para producción
```bash
npm run build
```

---

## ⚙️ Configuración

La configuración se gestiona mediante variables de entorno en el archivo `.env`.

Parámetro principal:
- `VITE_API_BASE_URL`: URL del backend (por defecto `http://localhost:8080`). Usado para proxear solicitudes `/api` en desarrollo.

---

## 📈 Posibles mejoras (Backlog)

El proyecto se encuentra en un estado activo orientado a portafolio.

### 1. Mejoras de UI
- **Animaciones:** Transiciones y micro-interacciones opcionales (por ejemplo, Framer Motion).

### 2. Funcionalidad
- **Localización (i18n):** Cambio de idioma de la interfaz.
- **Pulido de temas:** Mejora del comportamiento dark/light en Chakra UI 3.

### 3. Calidad de código y testing
- **Tests unitarios:** Tests de componentes con Vitest y React Testing Library.
- **Tests E2E:** Escenarios end-to-end con Playwright o Cypress.
- **TypeScript:** Migración gradual de JavaScript a TypeScript.

### 4. Observabilidad y analítica
- **Seguimiento de errores:** Error tracking en el cliente (por ejemplo, Sentry).
- **Rendimiento:** Monitorización de Core Web Vitals.