-- ==========================================================
-- SCRIPT DE PERMISOS PARA N8N Y EL AGENTE
-- Ejecutar después de `npx prisma db push`
-- ==========================================================

-- 1. Crear el usuario (cambia la contraseña por una segura en prod)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'agente_kaphiy') THEN
    CREATE USER agente_kaphiy WITH PASSWORD 'n8n_password_123!';
  END IF;
  
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'n8n') THEN
    CREATE USER n8n WITH PASSWORD 'n8n_password_123!';
  END IF;
END $$;

-- ====== PERMISOS PARA EL AGENTE KAPHIY ====== --

-- 2. Dar permiso para conectarse a la base de datos (kaphiy)
GRANT CONNECT ON DATABASE kaphiy TO agente_kaphiy;

-- 3. Dar acceso al esquema público (necesario en PostgreSQL 15+)
GRANT USAGE ON SCHEMA public TO agente_kaphiy;

-- 4. Permisos de SOLO LECTURA (Menú, mesas, ingredientes)
GRANT SELECT ON categories, tables, ingredients, products, product_ingredients TO agente_kaphiy;

-- 5. Permisos de LECTURA y ESCRITURA (Crear y actualizar pedidos)
GRANT SELECT, INSERT, UPDATE ON orders, order_items TO agente_kaphiy;

-- 6. Permisos de SECUENCIAS (Vital para crear nuevos pedidos)
-- Se otorga permiso sobre todas las secuencias del esquema publico para prevenir errores de inserción
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO agente_kaphiy;

-- ====== PERMISOS PARA LA MEMORIA N8N (TABLAS ESPECÍFICAS) ====== --

-- 1. Permisos COMPLETOS solo para la tabla de historial de chat
GRANT ALL PRIVILEGES ON TABLE n8n_chat_histories TO agente_kaphiy;

-- 2. Permisos COMPLETOS solo para la tabla de vectores (que creará n8n pronto)
-- Nota: Activa esta línea *DESPUÉS* de ejecutar el In-Memory Vector en n8n
-- GRANT ALL PRIVILEGES ON TABLE n8n_vectors TO agente_kaphiy;
