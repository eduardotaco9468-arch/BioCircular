# Auditoría final de entrega

Fecha: 2026-08-01

## Resultado

**No apto para entrega ni producción local.** La sintaxis de Docker Compose fue validada con `docker-compose config`, pero no se ha podido validar una construcción ni un arranque integral.

## Estado por componente

| Componente | Estado | Evidencia / riesgo |
|---|---|---|
| Frontend Angular | Parcial | Base Angular y Dockerfile presentes; faltan módulos CRUD, guards, servicios, pruebas y validación de compilación. |
| auth-service | Bloqueado | Solo existe Dockerfile; no hay `pom.xml`, código Spring ni configuración. |
| gestion-service | Bloqueado | Solo existe Dockerfile; no hay `pom.xml`, código Spring ni configuración. |
| compostaje-service | Parcial | Fuente y configuración añadidas; pendiente compilación, pruebas y validación de integración. |
| reportes-service | Parcial | Código de exportación y REST añadido; pendiente pruebas contra servicios reales y persistencia completa. |
| auditoria-service | Parcial | API inicial añadida; pendiente seguridad, validación, pruebas y revisión de serialización. |
| notificaciones-service | Parcial | API inicial añadida; no persiste ni entrega correo y carece de seguridad/pruebas. |
| monitoring-service | Parcial | Consulta de salud inicial; faltan todos los servicios requeridos y pruebas. |

## Docker y bases de datos

- `docker-compose.yml` tiene red, puertos y healthchecks definidos; su sintaxis es válida.
- Se añadieron montajes de inicialización a las bases de compostaje y reportes; los scripts solo se ejecutan al crear un volumen nuevo.
- La construcción no se verificó porque el daemon Docker Desktop Linux no estaba disponible.
- Cada esquema SQL mantiene una base por servicio; no se comprobó su ejecución real ni integridad en PostgreSQL.

## Seguridad, APIs y pruebas

No se puede certificar JWT, refresh token, roles, permisos, Swagger ni flujos REST porque los servicios que emiten y gestionan autenticación no existen como aplicaciones compilables. No hay suite de pruebas unitarias o de integración suficiente para emitir evidencia de CRUD, autenticación, reportes o notificaciones.

## Condiciones de aprobación

1. Implementar o restaurar `auth-service` y `gestion-service` completos.
2. Completar las funcionalidades pendientes identificadas en la tabla.
3. Iniciar Docker Desktop y ejecutar `docker compose up --build` desde un clon limpio.
4. Ejecutar pruebas automatizadas y pruebas manuales autenticadas para cada API y Swagger.
5. Solo tras esas evidencias, actualizar este informe a **Apto para entrega**.
