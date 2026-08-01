# Arquitectura técnica: Sistema de Gestión de Recolección y Compostaje

Este documento materializa la infraestructura definida por la arquitectura C4 y los ADR existentes. No contiene implementación de negocio, entidades, SQL ni controladores.

## Límites y responsabilidad de los servicios

| Servicio | Información bajo su propiedad | Consume | Es consumido por | Persistencia |
|---|---|---|---|---|
| `auth-service` | Credenciales, usuarios, roles, permisos y ciclo de vida de contraseñas. Emite JWT. | Ningún servicio de negocio. | Frontend y todos los servicios protegidos. | `auth_db` |
| `gestion-service` | Clientes, contenedores, operadores, vehículos, rutas, recolecciones y búsquedas operativas. | `auth-service` para seguridad, `notificaciones-service` y `auditoria-service`. | Frontend, `compostaje-service` y `reportes-service`. | `gestion_db` |
| `compostaje-service` | Ingresos de residuos, tipos de residuo, lotes, etapas, compost, inventario, observaciones y trazabilidad. | `auth-service`, `gestion-service`, `reportes-service` y `auditoria-service`. | Frontend y `reportes-service`. | `compostaje_db` |
| `reportes-service` | Solicitudes, metadatos y resultados de reportes PDF/Excel e indicadores ambientales. | `gestion-service` y `compostaje-service`. | Frontend y `compostaje-service`. | `reportes_db` |
| `auditoria-service` | Eventos de auditoría: quién, cuándo, acción, recurso, resultado y contexto. | `auth-service` para seguridad. | Todos los servicios de negocio y el frontend para consulta autorizada. | `auditoria_db` |
| `notificaciones-service` | Solicitudes y estado transitorio de notificaciones de recolecciones e incidentes. | `auth-service` para seguridad y proveedor SMTP configurado. | `gestion-service` y otros servicios que detecten incidentes. | No se asigna base de datos en este alcance. |
| `monitoring-service` | Estado técnico y disponibilidad de servicios. | Endpoints Actuator de todos los microservicios. | Operadores técnicos. | No se asigna base de datos en este alcance. |

Cada servicio es el único que accede a su propia base PostgreSQL. Ninguna llamada cruza hacia una tabla o base de datos de otro servicio.

## Comunicación REST/JSON

Todas las solicitudes usan HTTP, JSON y JWT Bearer. Las comunicaciones internas usan los nombres DNS de Docker (`gestion-service`, `reportes-service`, etc.) dentro de `compostaje-network`.

| Evento o necesidad | Flujo |
|---|---|
| Inicio de sesión | Frontend → `auth-service`; recibe JWT para solicitudes posteriores. |
| Operación protegida | Frontend → servicio dueño del recurso; el servicio valida JWT y permisos. |
| Nueva recolección | `gestion-service` → `notificaciones-service` para avisar; `gestion-service` → `auditoria-service` para registrar la acción. |
| Incidente operativo | Servicio que lo detecte → `notificaciones-service`; también → `auditoria-service`. |
| Ingreso de residuo | `compostaje-service` consulta la referencia operativa necesaria a `gestion-service` y registra la acción en auditoría. |
| Cambio de etapa, lote o inventario | `compostaje-service` → `auditoria-service`. Al finalizar un lote, → `reportes-service` para actualizar datos de indicadores. |
| Generación de reporte | `reportes-service` → `gestion-service` y/o `compostaje-service`; persiste solo su metadato o resultado en `reportes_db`. |
| Monitoreo | `monitoring-service` → `/actuator/health` de cada microservicio. |

Las fallas entre servicios se tratarán como dependencias remotas: timeout, reintento acotado, trazabilidad del error y respuesta sin exposición de secretos. No se introduce mensajería ni microservicios adicionales.

## Endpoints principales (diseño)

Los prefijos están versionados (`/api/...`). Los recursos se expresan en plural, se usan identificadores en ruta y las búsquedas se realizan con parámetros de consulta.

### auth-service

| Método | Ruta | Propósito |
|---|---|---|
| POST | `/api/auth/login` | Autenticar y emitir JWT. |
| POST | `/api/auth/logout` | Cerrar sesión según la política de token. |
| POST | `/api/auth/forgot-password` | Solicitar recuperación de contraseña. |
| PUT | `/api/auth/change-password` | Cambiar contraseña del usuario autenticado. |
| GET, POST | `/api/users` | Consultar o registrar usuarios. |
| GET, PUT, DELETE | `/api/users/{id}` | Consultar, actualizar o desactivar un usuario. |
| GET, POST | `/api/roles` | Consultar o crear roles. |
| GET, PUT, DELETE | `/api/roles/{id}` | Gestionar un rol. |
| GET | `/api/permissions` | Consultar permisos disponibles. |
| PUT | `/api/users/{id}/roles` | Asignar roles a un usuario. |

### gestion-service

| Método | Ruta | Propósito |
|---|---|---|
| GET, POST | `/api/clientes` | Consultar o registrar clientes. |
| GET, PUT, DELETE | `/api/clientes/{id}` | Gestionar un cliente. |
| GET, POST | `/api/contenedores` | Consultar o registrar contenedores. |
| GET, PUT, DELETE | `/api/contenedores/{id}` | Gestionar un contenedor. |
| GET, POST | `/api/operadores` | Consultar o registrar operadores. |
| GET, PUT, DELETE | `/api/operadores/{id}` | Gestionar un operador. |
| GET, POST | `/api/vehiculos` | Consultar o registrar vehículos. |
| GET, PUT, DELETE | `/api/vehiculos/{id}` | Gestionar un vehículo. |
| GET, POST | `/api/rutas` | Consultar o planificar rutas. |
| GET, PUT, DELETE | `/api/rutas/{id}` | Gestionar una ruta. |
| GET, POST | `/api/recolecciones` | Consultar o registrar recolecciones. |
| GET, PUT | `/api/recolecciones/{id}` | Consultar o actualizar una recolección. |
| GET | `/api/busquedas` | Búsqueda operativa mediante parámetros autorizados. |

### compostaje-service

| Método | Ruta | Propósito |
|---|---|---|
| GET, POST | `/api/ingresos-residuos` | Consultar o registrar ingreso de residuos. |
| GET, POST | `/api/tipos-residuos` | Consultar o registrar tipos de residuos. |
| GET, PUT, DELETE | `/api/tipos-residuos/{id}` | Gestionar tipo de residuo. |
| GET, POST | `/api/lotes` | Consultar o crear lotes. |
| GET, PUT | `/api/lotes/{id}` | Consultar o actualizar un lote. |
| GET, POST | `/api/lotes/{id}/etapas` | Consultar o registrar etapas de un lote. |
| GET, POST | `/api/lotes/{id}/observaciones` | Consultar o agregar observaciones. |
| GET | `/api/trazabilidad` | Consultar trazabilidad por filtros. |
| GET, POST | `/api/compost` | Consultar o registrar producto compost. |
| GET, POST | `/api/inventario` | Consultar o registrar movimientos de inventario. |

### reportes-service

| Método | Ruta | Propósito |
|---|---|---|
| GET, POST | `/api/reportes` | Consultar historial o solicitar generación de reporte. |
| GET | `/api/reportes/{id}` | Consultar metadatos y estado de un reporte. |
| GET | `/api/reportes/{id}/pdf` | Obtener la representación PDF autorizada. |
| GET | `/api/reportes/{id}/excel` | Obtener la representación Excel autorizada. |
| GET | `/api/indicadores-ambientales` | Consultar indicadores por período y filtros. |
| GET | `/api/dashboard` | Consultar resumen agregado para el tablero. |

### auditoria-service

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/api/auditorias` | Consultar eventos mediante filtros, paginación y permisos. |
| GET | `/api/auditorias/{id}` | Consultar detalle de un evento. |
| POST | `/api/auditorias/eventos` | Recibir un evento desde un servicio autorizado. |

### notificaciones-service

| Método | Ruta | Propósito |
|---|---|---|
| POST | `/api/notificaciones/recolecciones` | Solicitar notificación de nueva recolección. |
| POST | `/api/notificaciones/incidentes` | Solicitar notificación de incidente. |
| GET | `/api/notificaciones` | Consultar estado de solicitudes autorizadas. |

### monitoring-service

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/api/monitoring/servicios` | Consolidar estado técnico de todos los servicios. |
| GET | `/api/monitoring/servicios/{nombre}` | Consultar estado técnico de un servicio. |
| GET | `/actuator/health` | Healthcheck técnico estándar de Spring Boot Actuator. |

## Docker e infraestructura

- Cada servicio Java usa una construcción multi-etapa Maven + Eclipse Temurin 17 JRE. Los Dockerfiles no incorporan código de negocio.
- El frontend usa una construcción multi-etapa Node 20 + Nginx. Cuando se cree Angular, el resultado esperado es `dist/biocircular-web/browser`.
- `docker-compose.yml` define ocho aplicaciones, cinco PostgreSQL 16 y una red bridge privada llamada `compostaje-network`.
- Los volúmenes `*-postgres-data` preservan los datos de cada PostgreSQL. Las bases no se exponen como puertos del host.
- PostgreSQL se valida con `pg_isready`. Cada aplicación Spring se valida con `GET /actuator/health`; para ello, su futura configuración debe exponer ese endpoint.
- Todos los contenedores usan `restart: unless-stopped`. Las dependencias de datos esperan `service_healthy` antes de iniciar.
- `.env` contiene valores locales de desarrollo y está ignorado por Git. `.env.example` es la plantilla que debe versionarse. En ambientes reales los secretos deben proceder de un gestor de secretos, no de un archivo versionado.

## Puertos locales

| Componente | Puerto host |
|---|---:|
| Frontend | 4200 |
| auth-service | 8081 |
| gestion-service | 8082 |
| compostaje-service | 8083 |
| reportes-service | 8084 |
| auditoria-service | 8085 |
| notificaciones-service | 8086 |
| monitoring-service | 8087 |
