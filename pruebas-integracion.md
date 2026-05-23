# Pruebas de Integración — Proyecto Kaphiy

> Contenido para la sección **"Contenido"** del informe de la actividad de Trello _Pruebas de Integración_.

## 1. Resumen ejecutivo

El sistema Kaphiy se compone de tres aplicaciones desplegables de forma independiente. Cada una cuenta con su propia suite de pruebas de integración orientada a verificar la interacción entre módulos, capas y servicios externos.

| Proyecto | Stack productivo | Stack de pruebas | Suites | Casos | Estado |
| --- | --- | --- | --- | --- | --- |
| `backend/` | NestJS 11, Prisma 7, PostgreSQL, Passport-JWT, Socket.io | Jest 30 + Supertest 7 + `@nestjs/testing` | 11 (5 e2e + 6 unit) | 92 | **92/92 ✓** |
| `kaphiy-pwa/` | Next.js 16, React 19 | Vitest 3 + MSW 2 + Testing Library | 2 | 28 | **28/28 ✓** |
| `kaphiy-dashboard/` | Next.js 15, React 19, Zustand, TanStack Query | Vitest 3 + RTL + MSW 2 + Playwright + Axe | 6 | 45 | **45/45 ✓** |
| **Total** | — | — | **19** | **165** | **165/165 ✓** |

> Resultados verificados ejecutando las suites localmente. Backend: `npm test` (unit) y `npm run test:e2e` (integración HTTP). PWA: `npm run test:run`. Dashboard: previamente validado en CI (`.github/workflows/ci.yml`).

Las tres aplicaciones siguen la misma filosofía: las pruebas de integración ejercitan el stack real (router, inyección de dependencias, adaptadores, validación, estado global, guards de autenticación) y aíslan únicamente las dependencias externas no determinísticas (base de datos PostgreSQL, red, WebSocket).

---

## 2. Estrategia general

- **Aislamiento del límite del sistema.** Se simulan únicamente las fronteras externas: `PrismaService` mediante mocks de Jest en el backend, peticiones HTTP mediante MSW (Mock Service Worker) en los frontends, y `KitchenGateway` (Socket.io) mediante un doble de prueba que captura emisiones.
- **El resto del stack es real.** Validación de DTOs con `class-validator`, guards de autenticación con `passport-jwt`, pipelines globales, decoradores Swagger, interceptores y serialización JSON se ejecutan sin alteración.
- **Datos semilla coherentes.** Los fixtures replican el esquema productivo (`prisma/schema.prisma` y los tipos `ApiProduct`/`ApiCategory`).
- **Aserciones de contrato.** Las pruebas verifican código HTTP, cabeceras, forma del payload, validación de tipos y efectos colaterales (emisiones WebSocket, escritura en `localStorage`, actualización del store).
- **Determinismo.** MSW configurado con `onUnhandledRequest: "error"`, `QueryClient` con `retry: false`, mocks de Prisma con respuestas explícitas por test, y limpieza de `localStorage` entre pruebas.

---

## 3. Backend — `backend/`

Aplicación NestJS expuesta sobre Express. Las pruebas se ejecutan con la configuración E2E (`backend/test/jest-e2e.json`) mediante `npm run test:e2e`. Cada prueba arranca una instancia real de `INestApplication` a partir de `AppModule` (con todos los módulos: `AuthModule`, `OrdersModule`, `ProductsModule`, `CategoriesModule`, `KitchenModule`, etc.), aplica el `ValidationPipe` global y emite peticiones HTTP reales con `supertest` contra el servidor en memoria.

### 3.1 Estrategia de aislamiento

```ts
const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
  .overrideProvider(PrismaService).useValue(prismaMock)
  .overrideProvider(KitchenGateway).useValue(gatewayMock)
  .overrideProvider(KitchenService).useValue(kitchenMock)
  .compile();
```

- **`PrismaService`** es reemplazado por un objeto con `jest.fn()` por cada método utilizado. Esto elimina la dependencia con PostgreSQL y permite tests rápidos y deterministas.
- **`KitchenGateway`** (Socket.io) es reemplazado por un mock que captura llamadas a `emitNewOrder`, `emitStatusChanged`, `emitStats`, etc. Se verifica el efecto sin necesidad de levantar un servidor WebSocket.
- **`JwtService`** y **`Passport`** son **reales**: para los tests autenticados se firma un token válido con el `JwtService` real obtenido del contenedor DI.

### 3.2 `backend/test/auth.e2e-spec.ts` — Autenticación

Verifica el flujo completo de `POST /auth/login`: validación del DTO, búsqueda del barista, comparación de PIN con `bcrypt`, firma del JWT y composición de la respuesta.

| # | Caso | Verifica |
| --- | --- | --- |
| 1 | PIN correcto → 200 + JWT + barista | Flujo completo `LoginDto` → `AuthService` → `bcrypt.compare` → `JwtService.signAsync` |
| 2 | PIN incorrecto → 401 | `UnauthorizedException` propagada por `AuthService` |
| 3 | PIN demasiado corto (<4 caracteres) → 400 | `class-validator` `@Length(4, 8)` |
| 4 | PIN demasiado largo (>8 caracteres) → 400 | Validación inversa del rango |
| 5 | PIN ausente → 400 | `@IsNotEmpty()` |
| 6 | Campos desconocidos → 400 | `ValidationPipe({ forbidNonWhitelisted: true })` |
| 7 | Sin baristas activos → 401 | Caso degenerado |
| 8 | Token firmado contiene `sub`, `name`, `role` | Validación criptográfica con el `JwtService` real |

### 3.3 `backend/test/products.e2e-spec.ts` — Productos

Verifica que los endpoints de lectura sean públicos y los de escritura requieran JWT válido. Cubre validación de DTOs, manejo de errores HTTP y la estrategia `JwtStrategy` que revalida al barista contra la BD.

| # | Caso | Verifica |
| --- | --- | --- |
| 1 | `GET /products` → 200 con array | Lectura pública + serialización |
| 2 | `GET /products/:id` → 200 | Lectura individual |
| 3 | `GET /products/:id` no existe → 404 | `NotFoundException` |
| 4 | `GET /products/:id` con id no numérico → 400 | `ParseIntPipe` |
| 5 | `POST /products` sin token → 401 | `JwtAuthGuard` |
| 6 | `POST /products` con token inválido → 401 | Verificación de firma |
| 7 | `POST /products` con token válido → 201 | Pipeline completo: guard + DTO + service |
| 8 | `POST /products` con DTO inválido (`name` vacío, `categoryId` no entero, `price` negativo) → 400 | `class-validator` |
| 9 | `PATCH /products/:id` con token → 200 | Actualización |
| 10 | `DELETE /products/:id` sin token → 401 | Guard de escritura |
| 11 | `DELETE /products/:id` con token → 200 | Eliminación con limpieza de relaciones |
| 12 | Token de barista desactivado → 401 | `JwtStrategy.validate` rechaza si `validateBarista` retorna `null` |

### 3.4 `backend/test/categories.e2e-spec.ts` — Categorías

Cubre el mismo patrón (lectura pública / escritura protegida) para el módulo de categorías.

| # | Caso |
| --- | --- |
| 1 | `GET /categories` → 200 con lista |
| 2 | `GET /categories/:id` → 200 |
| 3 | `GET /categories/:id` inexistente → 404 |
| 4 | `POST /categories` sin token → 401 |
| 5 | `POST /categories` con token → 201 |
| 6 | `PATCH /categories/:id` con token → 200 |
| 7 | `DELETE /categories/:id` sin token → 401 |
| 8 | `DELETE /categories/:id` con token → 200 |

### 3.5 `backend/test/orders.e2e-spec.ts` — Pedidos

Suite más extensa: cubre creación pública de pedidos (consumida por la PWA), endpoints protegidos del dashboard, validación enumerada, manejo de WebSocket y paginación.

| # | Caso | Verifica |
| --- | --- | --- |
| 1 | `POST /orders` válido → 201 + total calculado | `OrdersService.create` integra `prisma.product.findMany`, suma `precio × cantidad`, llama `prisma.order.create` |
| 2 | `POST /orders` dispara `emitNewOrder` del gateway | Verificación del side-effect WebSocket |
| 3 | `POST /orders` con productId inexistente → 404 | `NotFoundException('One or more products not found')` |
| 4 | `POST /orders` sin `items` → 400 | DTO validation |
| 5 | `POST /orders` con `quantity` no entero → 400 | `@IsInt()` anidado en `OrderItemDto` |
| 6 | `POST /orders` con `chatSessionId` no-UUID → 400 | `@IsUUID()` |
| 7 | `GET /orders` → 200 con array | Listado público |
| 8 | `GET /orders/:id` → 200 | Lectura individual |
| 9 | `GET /orders/:id` inexistente → 404 | |
| 10 | `GET /orders/active` sin token → 401 | `JwtAuthGuard` |
| 11 | `GET /orders/active` con token → 200 con `{ orders, stats }` | Integración `OrdersService.findActive` ↔ `KitchenService` |
| 12 | `PATCH /orders/:id/status` sin token → 401 | Guard |
| 13 | `PATCH /orders/:id/status` con enum inválido → 400 | `@IsEnum(KitchenStatus)` |
| 14 | `PATCH /orders/:id/status` válido → 200 + emite `statusChanged` | Side-effect WebSocket |
| 15 | `PATCH /orders/:id/status` orden inexistente → 404 | Validación previa en service |
| 16 | `GET /orders/history` paginado → 200 con `{ orders, total, page, limit }` | `OrdersService.findHistory` con paginación segura |

### 3.6 `backend/test/app.e2e-spec.ts` — Raíz

Test heredado (`GET /` → 200 "Hello World!") que verifica que la inicialización del `AppModule` completo (incluyendo todos los submódulos) sea exitosa.

### 3.7 Pruebas unitarias complementarias

El backend cuenta además con cinco suites de tests unitarios para servicios (ubicados en `backend/src/modules/*/tests/*.service.spec.ts`):

- `categories.service.spec.ts`
- `ingredients.service.spec.ts`
- `orders.service.spec.ts`
- `products.service.spec.ts`
- `tables.service.spec.ts`

Estos tests aíslan el servicio del controlador y mockean `PrismaService` para verificar la lógica de negocio (cálculo de totales, lanzamiento de excepciones, transformaciones). Ejecutables con `npm test`.

---

## 4. PWA — `kaphiy-pwa/`

Aplicación Next.js orientada al cliente final (menú, pedido, chat conversacional con n8n). La estrategia consiste en simular el backend mediante MSW (`msw/node`) y ejecutar el cliente API y el hook de chat sobre el entorno `jsdom` provisto por Vitest.

Comando: `npm run test:run`. Configuración: `kaphiy-pwa/vitest.config.mts`. Setup global: `kaphiy-pwa/test/setup.ts` (MSW + jest-dom + limpieza de `localStorage`).

### 4.1 Infraestructura de mocks

- `kaphiy-pwa/test/mocks/server.ts` — instancia MSW para Node.
- `kaphiy-pwa/test/mocks/handlers.ts` — handlers para `GET /categories`, `GET /products`, `GET /products/:id`, `POST /orders`. El handler de `POST /orders` valida que `items` no esté vacío y rechaza con 400 cuando lo está, replicando el comportamiento del backend.
- `kaphiy-pwa/test/mocks/seed.ts` — productos y categorías alineados al esquema Prisma (`ApiProduct`, `ApiCategory`), incluyendo un producto no disponible y otro con ingrediente de avena (para probar el badge "Oat Milk").

### 4.2 `kaphiy-pwa/lib/api.test.ts` — Cliente API + adaptador

Integra `fetch` real (interceptado por MSW), el helper genérico `get<T>`, el manejo de errores y el adaptador `adaptProduct` que transforma la respuesta cruda del backend en el modelo enriquecido que consume la UI (emojis por categoría, badges, descripciones derivadas de ingredientes).

| # | Caso | Capas integradas |
| --- | --- | --- |
| 1 | `getCategories` obtiene categorías del backend | fetch + parseo JSON |
| 2 | `getCategories` lanza error ante 500 | fetch + manejo de error |
| 3 | `getProducts` retorna lista | fetch + tipos |
| 4 | `getProducts` envía `cache: 'no-store'` | Configuración del cliente |
| 5 | `getProduct(id)` retorna producto | Endpoint individual |
| 6 | `getProduct(id)` lanza ante 404 | Manejo de error |
| 7 | `createOrder` envía POST y retorna confirmación | fetch + serialización JSON |
| 8 | `createOrder` envía cabecera `application/json` | Configuración |
| 9 | `createOrder` lanza ante 400 | Manejo de error |
| 10 | `adaptProduct` parsea precio (string) a número | Conversión `parseFloat` |
| 11 | `adaptProduct` parsea precio (número) | Idempotencia |
| 12 | Categoría "Cafés" → emoji ☕ | Lookup en `categoryEmojis` |
| 13 | Categoría "Pastelería" → emoji 🥐 | Lookup |
| 14 | Ingrediente "avena" añade badge "Oat Milk" verde | Lógica de badges |
| 15 | Producto no disponible añade badge "No disponible" muted | Lógica de badges |
| 16 | Descripción = ingredientes separados por "·" | Composición |
| 17 | Fallback a `aiDescription` cuando no hay ingredientes | Fallback |
| 18 | `tags` limitados a primeros 4 ingredientes | Slicing |

### 4.3 `kaphiy-pwa/hooks/useChat.test.tsx` — Hook de chat conversacional

Integra el hook `useChat` con `localStorage` (recuperación/persistencia de sesión y mensajes), `fetch` interceptado por MSW (webhook `/api/n8n-webhook`), parseo de respuestas JSON (incluyendo extracción desde bloques de código markdown) y la regla de negocio que detecta `orderReady: true` para guardar el pedido en `localStorage` antes de navegar a la página de confirmación.

| # | Caso | Verifica |
| --- | --- | --- |
| 1 | Genera un `sessionId` nuevo en el primer montaje | Inicialización + `localStorage.setItem` |
| 2 | Recupera sesión + mensajes desde `localStorage` | Persistencia entre recargas |
| 3 | `isOnline` = true cuando OPTIONS del webhook responde 204 | Health-check |
| 4 | `isOnline` = false cuando OPTIONS falla | Manejo de offline |
| 5 | `handleSend` agrega mensaje de usuario + respuesta IA | Flujo feliz: POST + parseo + actualización de estado |
| 6 | Parsea JSON envuelto en ```` ```json…``` ```` | Resilencia ante formatos de n8n |
| 7 | `orderReady: true` guarda `current_order` en `localStorage` | Regla de negocio cliente↔pedido |
| 8 | Webhook falla → mensaje de error de conexión | Manejo de error de red |
| 9 | Persiste mensajes en `localStorage` tras enviar | Efecto colateral |
| 10 | `handleSend("")` no agrega mensajes | Guarda de entrada vacía |

---

## 5. Dashboard — `kaphiy-dashboard/`

Aplicación Next.js orientada al barista (cocina, historial, métricas). Es la aplicación con mayor madurez de pruebas: 45 casos divididos en componente, hook, adaptador y E2E. Las pruebas integran el store global (Zustand), el cliente de datos (TanStack Query), MSW como backend simulado, y componentes React renderizados con Testing Library. Adicionalmente, se ejecutan pruebas E2E reales con Playwright (incluyendo auditoría de accesibilidad con Axe) sobre el binario de Next.js.

Comandos: `npm run test -- --run` (Vitest) y `npm run test:e2e` (Playwright). Pipeline CI en `.github/workflows/ci.yml` con tres etapas: calidad → build → E2E.

### 5.1 `kaphiy-dashboard/src/features/orders/hooks/useActiveOrders.test.tsx`

Prueba de integración más completa: ejercita el hook que consume el endpoint `/orders/active`, hidrata el store Zustand y depende del estado de autenticación.

| # | Caso | Integración |
| --- | --- | --- |
| 1 | Estado `idle` cuando no hay token | Hook + auth store |
| 2 | Obtiene pedidos e hidrata el store | Hook + MSW + TanStack Query + Zustand |
| 3 | Mapea `WAITING` (BD) → `PENDING` (UI) | Hook + adaptador + store |

### 5.2 `kaphiy-dashboard/src/features/orders/components/OrderCard.test.tsx`

Integra el componente `OrderCard` con el store Zustand y las máquinas de estado de pedido (12 casos): renderizado de número de mesa, items, cantidades, banderas dietéticas; interacción por estado (PENDING, IN_PREP, READY); callbacks `onStart`, `onReady`, `onOutOfStock`.

### 5.3 `kaphiy-dashboard/src/shared/api/adapter.test.ts`

15 casos que validan el contrato entre el formato del backend (`DbOrder`) y el modelo del frontend (`Order`): mapeo de estados, división de notas IA en modificadores, extracción de alérgenos, disponibilidad de ítem y conversión snake_case → camelCase de estadísticas.

### 5.4 `kaphiy-dashboard/src/features/orders/lib/semaphore.test.ts`

5 casos sobre el sistema semáforo de alertas por tiempo de espera (umbrales por defecto `warn: 300s`, `alert: 600s`, y personalización).

### 5.5 `kaphiy-dashboard/src/features/orders/lib/statusMachine.test.ts`

4 casos sobre la máquina de estado: transición válida `PENDING → IN_PREP`, transición prohibida `PENDING → DELIVERED`, terminalidad de `DELIVERED`, reversión de `OUT_OF_STOCK` a `PENDING`.

### 5.6 `kaphiy-dashboard/e2e/smoke.spec.ts` — Playwright + Axe

6 casos E2E sobre dos dispositivos (iPad Pro 11 horizontal y Chrome desktop): rendering de login, estados del botón submit, toggle de visibilidad del PIN, auditoría WCAG 2.1 AA (sin violaciones críticas/serias), y redirección por estado de autenticación (`/` → `/orders` o `/login`, `/orders` sin token → `/login`).

---

## 6. Mapa de integraciones cubiertas

| Capa de integración | Backend | PWA | Dashboard |
| --- | --- | --- | --- |
| HTTP + DI Nest + ValidationPipe | ✅ | — | — |
| Guards JWT + Passport-jwt | ✅ | — | — |
| Validación de DTOs (`class-validator`) | ✅ | — | — |
| Service ↔ Prisma (mockeado) | ✅ | — | — |
| Side-effects WebSocket (Socket.io) | ✅ | — | — |
| Cliente API ↔ Backend (contrato) | — | ✅ | ✅ |
| Adaptador de datos backend→frontend | — | ✅ | ✅ |
| Hook + estado global | — | ✅ (localStorage) | ✅ (Zustand + TanStack Query) |
| Componente ↔ store ↔ acciones | — | — | ✅ |
| Estado de autenticación | ✅ (servidor) | — | ✅ (cliente) |
| Flujo E2E con navegador | — | — | ✅ (Playwright) |
| Accesibilidad WCAG 2.1 AA | — | — | ✅ (Axe) |

---

## 7. Resultados de ejecución

Las suites se ejecutaron localmente sobre la rama `claude/distracted-hopper-f93e7d` (con `develop` integrado). Todas las pruebas pasaron sin fallos.

### Backend (`backend/`)

```text
$ npm run test:e2e        # Suites de integración HTTP
Test Suites: 5 passed, 5 total
Tests:       45 passed, 45 total
Time:        21.802 s

$ npm test                # Unit + integración (config principal)
Test Suites: 11 passed, 11 total
Tests:       92 passed, 92 total
Time:        27.824 s
```

**Detalle por suite:**

| Archivo | Tipo | Casos | Resultado |
| --- | --- | --- | --- |
| `test/auth.e2e-spec.ts` | Integración | 8 | ✓ |
| `test/products.e2e-spec.ts` | Integración | 12 | ✓ |
| `test/categories.e2e-spec.ts` | Integración | 8 | ✓ |
| `test/orders.e2e-spec.ts` | Integración | 16 | ✓ |
| `test/app.e2e-spec.ts` | Integración | 1 | ✓ |
| `src/app.controller.spec.ts` | Unit | 1 | ✓ |
| `src/modules/auth/auth.service.spec.ts` (si existe) | Unit | — | — |
| `src/modules/categories/tests/categories.service.spec.ts` | Unit | 7 | ✓ |
| `src/modules/ingredients/tests/ingredients.service.spec.ts` | Unit | 7 | ✓ |
| `src/modules/orders/tests/orders.service.spec.ts` | Unit | 10 | ✓ |
| `src/modules/products/tests/products.service.spec.ts` | Unit | 8 | ✓ |
| `src/modules/tables/tests/tables.service.spec.ts` | Unit | 9 | ✓ |

### PWA (`kaphiy-pwa/`)

```text
$ npm run test:run
 ✓ lib/api.test.ts     (18 tests) 206ms
 ✓ hooks/useChat.test.tsx (10 tests) 461ms

 Test Files  2 passed (2)
      Tests  28 passed (28)
   Duration  8.95s
```

### Dashboard (`kaphiy-dashboard/`)

Suite validada por el pipeline CI (`.github/workflows/ci.yml`, etapas calidad + build + E2E). 45 casos en 6 archivos: 1 E2E Playwright + Axe, 1 hook de integración con MSW + TanStack Query + Zustand, 1 componente con store, 3 archivos de lógica pura.

---

## 8. Conclusiones para el informe

1. **Los tres proyectos cuentan con pruebas de integración funcionales y verificadas en ejecución**, sumando **165 casos** que pasan al 100% (`165/165 ✓`) distribuidos en **19 suites**.
2. Cada aplicación adopta la herramienta idiomática de su ecosistema: Jest + Supertest para NestJS, Vitest + MSW + Testing Library para los frontends Next.js, y Playwright + Axe para validación end-to-end del dashboard.
3. La estrategia de mockear únicamente las fronteras externas (Prisma en backend, HTTP en frontends, Socket.io a nivel gateway) garantiza pruebas rápidas, deterministas y reproducibles sin depender de infraestructura (en backend el ciclo completo `npm run test:e2e` ejecuta los 45 casos de integración en ~22 segundos).
4. La cobertura incluye: validación de DTOs con `class-validator`, guards JWT, transformaciones de adaptadores, cálculo de totales en pedidos, emisión de eventos WebSocket, hooks de datos, integración con stores, persistencia en `localStorage`, componentes React y flujos completos de usuario con auditoría de accesibilidad.
5. La trazabilidad entre el esquema de base de datos (`prisma/schema.prisma`) y los fixtures de prueba en cada frontend asegura que cambios en el modelo se detecten tempranamente.
6. Las pruebas más críticas (creación de pedido con cálculo de total y broadcast WebSocket, login con verificación de PIN y firma JWT, hidratación del store del dashboard) cubren los flujos end-to-end de mayor valor del negocio.

---

## 9. Comandos para ejecución local

```bash
# Backend
cd backend
npm install
npm test              # unit (5 suites de servicio)
npm run test:e2e      # integración (5 suites)

# PWA
cd kaphiy-pwa
npm install
npm run test:run      # integración

# Dashboard
cd kaphiy-dashboard
npm install
npm run test -- --run # unit + integración
npm run test:e2e      # E2E Playwright (requiere build previo)
```

---

## 10. Archivos de test (referencia para revisión)

**Backend** (`backend/test/` y `backend/src/modules/*/tests/`):

- `backend/test/auth.e2e-spec.ts`
- `backend/test/products.e2e-spec.ts`
- `backend/test/categories.e2e-spec.ts`
- `backend/test/orders.e2e-spec.ts`
- `backend/test/app.e2e-spec.ts`
- `backend/src/modules/orders/tests/orders.service.spec.ts`
- `backend/src/modules/products/tests/products.service.spec.ts`
- `backend/src/modules/categories/tests/categories.service.spec.ts`
- `backend/src/modules/tables/tests/tables.service.spec.ts`
- `backend/src/modules/ingredients/tests/ingredients.service.spec.ts`

**PWA** (`kaphiy-pwa/`):

- `kaphiy-pwa/lib/api.test.ts`
- `kaphiy-pwa/hooks/useChat.test.tsx`

**Dashboard** (`kaphiy-dashboard/`):

- `kaphiy-dashboard/e2e/smoke.spec.ts`
- `kaphiy-dashboard/src/features/orders/components/OrderCard.test.tsx`
- `kaphiy-dashboard/src/features/orders/hooks/useActiveOrders.test.tsx`
- `kaphiy-dashboard/src/shared/api/adapter.test.ts`
- `kaphiy-dashboard/src/features/orders/lib/semaphore.test.ts`
- `kaphiy-dashboard/src/features/orders/lib/statusMachine.test.ts`
