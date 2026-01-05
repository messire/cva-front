#### Languages:  
[English](./README.md) | [Русский](./README.ru.md) | [Español](./README.es.md)

---

# CV Frontend Service

Aplicación frontend para el servicio CV (Curriculum Vitae), construida con React y Chakra UI.
Diseñada para visualizar perfiles de usuario, gestionar experiencia profesional e interactuar con el CV Backend Service.

---

## 🛠 Stack Tecnológico

- **Librería:** React 19
- **Herramienta de Construcción:** Vite 7
- **Marco de IU:** Chakra UI 3
- **Gestión de Estado:** Zustand
- **Enrutamiento:** React Router 7
- **Iconos:** React Icons
- **Cliente HTTP:** Fetch nativo (con envoltorio apiFetch personalizado)
- **Linting:** ESLint

---

## 🚀 Inicio Rápido

Para ejecutar el proyecto localmente, siga estos pasos:

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Construir para Producción
```bash
npm run build
```

---

## ⚙️ Configuración

Los ajustes se gestionan a través de variables de entorno en el archivo `.env`.

Parámetros principales:
- `VITE_API_BASE_URL`: URL del servicio backend (por defecto `http://localhost:8080`). Se utiliza para el proxy de solicitudes `/api` durante el desarrollo.

---

## 📈 Mejoras Potenciales (Backlog)

El proyecto está bajo desarrollo activo. A continuación se presentan posibles direcciones para futuras mejoras y crecimiento:

### 1. Mejoras de la IU
- **Edición de Perfil:** Interfaz completa para crear y editar datos de usuario (actualmente en desarrollo).
- **Exportación a PDF:** Capacidad para generar y descargar CV en formato PDF directamente desde el navegador.
- **Animaciones:** Añadir transiciones suaves y micro-interacciones usando Framer Motion.

### 2. Funcionalidad
- **Búsqueda y Filtrado:** Filtros avanzados en el catálogo de perfiles por habilidades y experiencia.
- **Localización (i18n):** Soporte para el cambio de idioma de la IU.
- **Temas Oscuro/Claro:** Pulido adicional de componentes para una visualización perfecta en ambos modos (Chakra UI 3 Color Mode).

### 3. Calidad del Código y Pruebas
- **Pruebas Unitarias:** Cobertura de pruebas de componentes usando Vitest y React Testing Library.
- **Pruebas E2E:** Pruebas de integración usando Playwright o Cypress.
- **TypeScript:** Migración a TypeScript para mayor confiabilidad y mejor DX.

### 4. Observabilidad y Analítica
- **Seguimiento de Errores:** Integración con Sentry para el seguimiento de errores en el lado del cliente.
- **Monitoreo del Rendimiento:** Monitoreo de Core Web Vitals.
