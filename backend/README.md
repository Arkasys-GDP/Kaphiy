# ☕ KAPHIY Backend API

Backend del sistema de pedidos web **KAPHIY** para Praliné Coffee House.  
Desarrollado con **NestJS**, diseñado bajo una arquitectura escalable, modular y orientada a microservicios.

---

## 📌 Descripción

Este proyecto implementa una API REST para gestionar:

- Productos y Menú Categorizado
- Pedidos y órdenes de atención
- Gestión de ingredientes

El sistema está diseñado para integrarse con un frontend web y permitir pedidos mediante código QR, incorporando una arquitectura preparada para una IA autónoma (Gemini + n8n).

---

## 🛠️ Stack Tecnológico

- **Framework:** NestJS 11
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma (v7.7.0) con `@prisma/adapter-pg`
- **Validación:** class-validator
- **Documentación:** Swagger OpenAPI (`/api`)

---

## ⚙️ Pasos de Instalación para el Equipo

Si acabas de clonar el repositorio, sigue estos pasos estrictamente para que tu entorno levante sin errores:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto. **Solicita la URL de la base de datos al administrador.**

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST/DATABASE?sslmode=require"
```

### 3. Sincronizar Prisma y Generar Cliente
Este proyecto usa Prisma como fuente de la verdad para la DB. Ejecuta:
```bash
npx prisma db push
npx prisma generate
```
*(Nota: Nunca uses `prisma db pull` si ves que tus tablas entran en conflicto, la estructura real ya cuenta con `@map` a `snake_case` integrados).*

### 4. Cargar Datos de Prueba (Seeder)
Si la base de datos está vacía, puedes ejecutar el siguiente comando para llenar productos, ingredientes y mesas iniciales:
```bash
npx prisma db seed
```

---

## ▶️ Ejecución del proyecto

```bash
# Servidor de Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

Una vez que el servidor esté corriendo, puedes ver toda la documentación y endpoints entrando a:  
👉 **http://localhost:3000/api** (Swagger UI)

---

## 🤖 Agente IA (Configuración n8n)

Para permitir que el asistente virtual Kaphiy opere sobre Postgres:
Al actualizar la base de datos, entra a tu gestor SQL o ejecuta el script en `prisma/n8n_grants.sql` para forzar las reglas de solo lectura y blindar el sistema.

---
