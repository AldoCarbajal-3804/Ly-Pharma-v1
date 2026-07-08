# Ly Pharma

Sistema de escritorio para la gestión de inventario farmacéutico. Construido con **React 18**, **Vite 5**, **Tailwind CSS v4** y **Electron 28**.

## Tecnologías

| Frontend | Bundler | Desktop | Estilos | Estado | Gráficos | Exportación |
|---|---|---|---|---|---|---|
| React 18 + React Router 7 | Vite 5 | Electron 28 | Tailwind CSS v4 | TanStack React Query 5 | react-charts | xlsx + file-saver |

## Estructura del proyecto

```
src/
├── assets/              # Imágenes (logo, banner) e íconos SVG
├── cache/               # React Query hooks (useMuestraCache, useVentasCache, etc.)
├── components/          # Componentes reutilizables
│   ├── charts/          # Gráficos (GananciasCard, PieChartCard, RankingCard, etc.)
│   ├── ButtonNavbar.jsx
│   ├── ExcelTable.jsx   # Exportación a XLSX
│   ├── ProtectedRoute.jsx
│   └── Ticket.jsx       # Comprobante de venta con impresión
├── data/                # Datos mock legacy
├── hooks/               # useAuth (contexto de autenticación JWT)
├── routes/              # Login, Principal (layout), NotFound
├── services/            # Capa de servicios HTTP (auth, productos, ventas, reportes, etc.)
├── views/               # Vistas organizadas por rol
│   ├── admin/           # Admin: CRUD completo, todas las ventas, reportes globales
│   ├── empleado/        # Empleado: solo lectura, sus ventas, reportes personales
│   ├── inicio/          # Dashboard (stats, alertas, sesiones)
│   ├── products/        # Componentes compartidos de productos
│   ├── ventas/          # Componentes compartidos de ventas
│   └── configuracion/   # Perfil y formulario de actualización
├── App.jsx              # Definición de rutas
├── App.css              # Estilos globales + directivas Tailwind
├── main.jsx             # Entry point (QueryClientProvider + HashRouter)
└── variables.js         # Helper de URL base de la API
```

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia Vite + Electron en modo desarrollo |
| `pnpm dev:react` | Solo el frontend React (Vite) en `localhost:5173` |
| `pnpm dev:electron` | Espera al puerto 5173 y lanza Electron |
| `pnpm build` | Build de React + empaquetado con electron-builder (NSIS) |
| `pnpm build:react` | Solo build del frontend (salida en `dist/`) |

## Funcionalidades

- **Autenticación** — Inicio de sesión con JWT, "Recordar sesión", recuperación de contraseña (solicitud de token + restablecimiento), cierre de sesión automático al cerrar la ventana
- **Dashboard** — Tarjetas con resumen de ventas del día, stock bajo, productos por vencer y ganancia diaria. Tabla de sesiones recientes y panel de alertas de productos
- **Productos (Admin)** — CRUD completo: tabla paginada con búsqueda, filtros por categoría/tipo/proveedor/stock/vencimiento, filas coloreadas por proximidad a vencimiento (rojo ≤5 días, naranja ≤10 días)
- **Productos (Empleado)** — Vista de solo lectura con los mismos filtros y paginación
- **Ventas (Admin)** — Historial completo de ventas con filtro por empleado, registro de nuevas ventas, comprobante/ticket con impresión, exportación a Excel
- **Ventas (Empleado)** — Historial de sus propias ventas, registro de nuevas ventas, ticket y exportación a Excel
- **Reportes (Admin)** — Gráfico de ganancias (diario/mensual/anual), ranking de empleados, gráficos circulares de ventas por proveedor/categoría/tipo, productos más vendidos
- **Reportes (Empleado)** — Gráfico de ganancias personales, productos más vendidos, distribución porcentual por proveedor/categoría/tipo
- **Configuración** — Perfil de usuario con avatar, nombre, rol y formulario de actualización de datos
- **Navegación** — Menú lateral colapsable, barra superior con fecha/hora, usuario y rol activo

## Roles de usuario

- **Admin** — Acceso completo a productos (CRUD), todas las ventas, reportes globales y configuración
- **Empleado** — Visualización de productos (solo lectura), registro de ventas propias, reportes personales

## Build para producción

```bash
pnpm build
```

Genera un instalador de Windows (NSIS) en la carpeta `release/`.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_RUTA_API` | URL base de la API backend (ej. `https://ly-pharma-backend.vercel.app`) |
