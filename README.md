# Lappiz Backend - API de Gestión de Leads (NestJS + PostgreSQL + JWT + AI)

## 1. Descripción General

API REST desarrollada con **NestJS** para la gestión de leads (personas interesadas en demos de una plataforma LowCode).

Incluye:

- CRUD completo de leads
- Filtros, paginación y estadísticas
- Autenticación con JWT
- Seed de datos
- Integración preparada para IA (OpenAI) con mock
- Arquitectura escalable y desacoplada

---

## 2. Tecnologías utilizadas

- NestJS → Framework backend estructurado y escalable
- TypeORM → ORM para manejo de base de datos
- PostgreSQL → Base de datos relacional
- JWT → Autenticación
- class-validator / class-transformer → Validación de datos
- Bun → Runtime rápido para ejecución
- OpenAI (mock) → Preparado para integración con LLM

---

## 3. Instalación

### Requisitos

- Bun
- Node.js
- PostgreSQL

---

### Pasos

```bash
git clone <repo>
cd <repo>
bun install
```

---

## 4. Variables de entorno

Crear archivo `.env` basado en `.env.example`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=leads_db

JWT_SECRET=secret
OPENAI_API_KEY=your_key_here
```

---

## 5. Base de datos

Crear base de datos en PostgreSQL:

```sql
CREATE DATABASE leads_db;
```

---

## 6. Migraciones y Seed

```bash
bun run migration:run
bun run seed
```

---

## 7. Ejecutar proyecto

```bash
bun run start:dev
```

---

## 8. Autenticación

### Obtener token

```http
POST /auth/login
```

Respuesta:

```json
{
  "access_token": "TOKEN"
}
```

### Uso del token

```http
Authorization: Bearer TOKEN
```

---

## 9. Endpoints

### Leads

- POST /leads → Crear lead
- GET /leads → Listar con filtros y paginación
- GET /leads/:id → Obtener uno
- PATCH /leads/:id → Actualizar
- DELETE /leads/:id → Eliminar (soft delete)

### Filtros

```http
GET /leads?fuente=facebook&page=1&limit=10
GET /leads?startDate=2026-01-01&endDate=2026-12-31
```

---

### Estadísticas

```http
GET /leads/stats
```

---

### IA (Resumen de leads)

```http
POST /leads/ai/summary
```

Body opcional:

```json
{
  "fuente": "facebook",
  "startDate": "2026-01-01",
  "endDate": "2026-12-31"
}
```

Respuesta:

```json
{
  "summary": "Resumen ejecutivo..."
}
```

---

## 10. Manejo de errores

La API maneja errores de forma consistente:

- 400 → Validaciones
- 401 → No autorizado
- 404 → Recurso no encontrado
- 409 → Conflictos (ej: email duplicado)
- 500 → Error interno

Ejemplo:

```json
{
  "statusCode": 409,
  "message": "El email ya está registrado"
}
```

---

## 11. IA (Arquitectura)

El servicio de IA está desacoplado:

- AiService → lógica de IA
- buildPrompt → construcción del prompt
- callOpenAI → integración futura
- mockResponse → respuesta actual

Permite cambiar a OpenAI real sin modificar controladores.

---

## 12. Swagger

Disponible en:

http://localhost:3000/api/docs

---

## 13. Notas

- Se usa soft delete para eliminar leads
- Validaciones implementadas con DTOs
- Arquitectura preparada para escalar

---
