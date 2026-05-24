# 📂 Estructura del Repositorio - KAPHIY

Este documento detalla la estructura del repositorio del ecosistema digital **KAPHIY** para **Praliné Coffee House**. El repositorio está organizado como un monorepositorio que contiene tres proyectos principales: el backend en NestJS, el panel de administración (Dashboard) en Next.js y la aplicación web para clientes (PWA) también en Next.js.

---

## 🏛️ Árbol General de Directorios

```text
Kaphiy/
├── backend/                  # API REST en NestJS (Backend)
├── kaphiy-dashboard/         # Panel de Administración en Next.js (Dashboard Web)
├── kaphiy-pwa/               # Aplicación Móvil de Clientes en Next.js (PWA Client)
├── readme.md                 # Documentación general del proyecto
└── ESTRUCTURA.md             # Este archivo descriptivo de la estructura
```

---

## 1. ⚙️ [backend](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/backend)

Es el núcleo del sistema, desarrollado con **NestJS** y **TypeScript**. Se encarga de la lógica de negocio, autenticación, procesamiento de pedidos y comunicación con la base de datos PostgreSQL utilizando **Prisma ORM**.

### Estructura de Carpetas Clave:
* **[prisma/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/backend/prisma)**: Configuración y modelado de datos.
  * `schema.prisma`: Definición de la base de datos (tablas, relaciones y tipos).
  * `seed.ts` & `seed-barista.ts`: Scripts para popular la base de datos con datos de prueba.
  * `migrations/`: Historial de migraciones de la base de datos.
* **[src/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/backend/src)**: Código fuente del backend.
  * `main.ts`: Punto de entrada de la aplicación.
  * `app.module.ts`: Módulo raíz del backend.
  * **[modules/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/backend/src/modules)**: Módulos específicos de lógica de negocio (cada uno estructurado con sus controladores, servicios y DTOs):
    * `auth/`: Autenticación y control de accesos.
    * `categories/`: CRUD de categorías de productos.
    * `ingredients/`: Gestión de ingredientes del menú.
    * `kitchen/`: Control de pedidos en cocina.
    * `orders/`: Flujo y estados de pedidos.
    * `products/`: Catálogo y detalles de productos.
    * `tables/`: Gestión de mesas físicas del local.
* **Archivos de Configuración**:
  * `package.json`: Dependencias y scripts del backend.
  * `nest-cli.json`: Configuración del CLI de NestJS.
  * `tsconfig.json`: Configuración del compilador de TypeScript.
  * `.env.example`: Variables de entorno requeridas para desarrollo y producción.

---

## 2. 📊 [kaphiy-dashboard](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-dashboard)

El panel de control administrativo para el personal del local (cajeros, baristas y administradores). Está desarrollado en **Next.js** (App Router).

### Estructura de Carpetas Clave:
* **[app/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-dashboard/app)**: Enrutamiento y páginas.
  * `(auth)/login/`: Página de inicio de sesión administrativo.
  * `(dashboard)/`: Grupo de rutas privadas del panel:
    * `orders/`: Gestión y visualización de pedidos en tiempo real.
    * `products/`: Gestión del menú (agregar, editar, eliminar productos).
    * `ingredients/`: Control de inventario de ingredientes.
    * `metrics/`: Estadísticas de ventas y pedidos.
    * `history/`: Historial de comandas.
    * `settings/`: Ajustes del sistema y de la cuenta.
* **[components/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-dashboard/components)**: Componentes UI de React y proveedores globales (ej. temas, alertas).
* **[src/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-dashboard/src)**: Arquitectura limpia y lógica de negocio frontend.
  * `features/`: Lógica encapsulada por dominios (auth, categories, ingredients, metrics, notifications, orders, products).
  * `shared/`: Código compartido como llamadas de red (`api/`), configuración común (`config/`) y utilidades UI (`ui/`).
* **Archivos de Configuración**:
  * `package.json`: Dependencias (Next.js, TailwindCSS, etc.) y scripts del dashboard.
  * `next.config.mjs`: Configuración de Next.js.
  * `playwright.config.ts` & `playwright.system.config.ts`: Configuración para pruebas de integración/E2E.
  * `vitest.config.mts`: Configuración de pruebas unitarias.

---

## 3. 📱 [kaphiy-pwa](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa)

La Aplicación Web Progresiva orientada a dispositivos móviles (Mobile-First) para que los clientes puedan ver el menú, ordenar y pagar desde su mesa. Está desarrollada en **Next.js**.

### Estructura de Carpetas Clave:
* **[app/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa/app)**: Enrutamiento basado en archivos (App Router).
  * `inicio/`: Pantalla de bienvenida del cliente tras escanear el QR.
  * `menu/`: Visualización del catálogo de bebidas, repostería y alimentos.
  * `pedido/`: Detalle y checkout del carrito del cliente.
  * `mis-pedidos/`: Historial y seguimiento en tiempo real del estado de los pedidos realizados.
  * `chat/`: Chatbot asistente basado en Inteligencia Artificial (Google Gemini) para pedidos por voz o texto.
* **[components/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa/components)**:
  * `pwa/`: Componentes específicos de PWA (instalación, notificaciones offline, etc.).
  * `chat/`: Interfaz y lógica del chat interactivo.
  * `ui/`: Componentes reutilizables de diseño de interfaz (Shadcn/UI).
* **[hooks/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa/hooks)**: Custom hooks de React para lógica compartida y persistencia (ej. manejo de estado del carrito, conexión WebSocket).
* **[lib/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa/lib)**: Clientes de APIs, utilidades generales y configuración de clientes.
* **[types/](file:///d:/UTA/7mo%20Semestre/gps/Kaphiy/kaphiy-pwa/types)**: Definiciones de interfaces de TypeScript para tipado seguro.
* **Archivos de Configuración**:
  * `package.json`: Dependencias y scripts de la PWA.
  * `next.config.mjs`: Configuración del servidor y soporte PWA.
  * `playwright.config.ts`: Pruebas de integración para móviles.
  * `.env.example`: Ejemplo de variables de entorno (como URL de API backend y API keys de IA).
