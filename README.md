# Ly Pharma

Sistema de escritorio para la gestión de inventario farmacéutico. Construido con **React**, **Tailwind CSS v4** y **Electron**.

## Tecnologías

| Frontend | Bundler | Desktop | Estilos |
|---|---|---|---|
| React 18 | Vite 5 | Electron 28 | Tailwind CSS v4 |

## Estructura del proyecto

```
src/
├── assets/icons/     # Iconos SVG (nav, acciones)
├── components/       # Componentes reutilizables (ButtonNavbar)
├── data/             # Datos mock en JSON
│   ├── products.json       # 15 productos farmacéuticos
│   ├── ventas.json         # 24 registros de ventas
│   ├── usuario.json        # Perfil del usuario
│   ├── stats.json          # 4 tarjetas del dashboard
│   ├── transaction.json    # 3 transacciones recientes
│   └── alerts-products.json# 5 alertas de stock/vencimiento
├── routes/
│   ├── Login.jsx           # Pantalla de inicio de sesión
│   └── Principal.jsx       # Layout principal + navegación
└── views/
    ├── inicio/             # Dashboard con stats, transacciones y alertas
    ├── products/           # CRUD de productos con tabla, filtros y paginación
    ├── ventas/             # Historial de ventas con resumen y tabla
    └── configuracion/      # Perfil y formulario de ajustes de usuario
```

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia Vite + Electron en modo desarrollo |
| `pnpm dev:react` | Solo el frontend React (Vite) |
| `pnpm build` | Build de React + empaquetado con electron-builder |
| `pnpm build:react` | Solo build del frontend (salida en `dist/`) |

## Funcionalidades

- **Dashboard** — tarjetas con resumen de ventas, stock bajo, productos por vencer y ganancia diaria
- **Productos** — tabla paginada con búsqueda, filtros por categoría/tipo/proveedor, orden por costo y fecha de vencimiento. Las filas se colorean según la proximidad al vencimiento (rojo ≤5 días, naranja ≤10 días)
- **Ventas** — resumen de ingresos y tabla paginada con historial de ventas
- **Configuración** — perfil de usuario con avatar, datos personales y formulario de actualización
- **Navegación** — menú lateral colapsable con 5 secciones (Inicio, Productos, Ventas, Reportes, Configuración)

## Captura de inicio de sesión

El login es simulado: cualquier usuario/contraseña funciona tras 1 segundo de espera.

## Build para producción

```bash
pnpm build
```

Genera un instalador de Windows (NSIS) en la carpeta `release/`.
