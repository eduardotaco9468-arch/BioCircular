# Reportes Service

Microservicio que consulta exclusivamente por REST a gestion-service y compostaje-service, genera reportes PDF/XLSX reales y calcula el dashboard sin datos simulados.

## Endpoints
- `GET /api/reportes/dashboard` – indicadores resumidos.
- `GET /api/reportes/pdf?type=clientes` – PDF del tipo solicitado.
- `GET /api/reportes/excel?type=clientes` – Excel del tipo solicitado.
- `GET /api/reportes/{clientes,recolecciones,rutas,compostaje,inventario,indicadores,resumen}`.

## Build & Run (Docker)
```bash
docker compose up --build reportes-service
```

## Configuration
Variables de entorno (heredadas del `.env`):
- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- `JWT_JWK_SET_URI` – JWK del `auth-service`.
- `GESTION_SERVICE_URL`, `COMPOSTAJE_SERVICE_URL` – URL de los servicios de origen de datos.
- `AUDITORIA_SERVICE_URL` – URL para registrar auditoría.

## Tests
```bash
mvn test
```
