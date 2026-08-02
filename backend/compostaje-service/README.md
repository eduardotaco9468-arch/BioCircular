# compostaje-service

Microservicio propietario de `compostaje_db`. Expone la gestión de residuos, lotes, etapas, observaciones, producción, inventario, trazabilidad y dashboard en `/api`.

Se ejecuta desde la raíz con `docker compose up --build`. Swagger queda disponible en `http://localhost:8083/swagger-ui/index.html`; los endpoints de negocio requieren un JWT Bearer HS256 emitido por el servicio de autenticación.
