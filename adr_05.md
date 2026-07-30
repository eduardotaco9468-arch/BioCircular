# ADR-005: Uso de REST para Comunicación entre Servicios

**Estado:** Aprobado  

# 1. Contexto

Los componentes necesitan comunicarse:

- Angular consume servicios backend.
- Reportes consulta información de otros módulos.
- Notificaciones recibe eventos.


# 2. Problema

Se necesita un mecanismo:

- Simple.
- Compatible.
- Fácil de implementar.
- Adecuado para aplicaciones web.


# 3. Alternativas consideradas

## REST

### Ventajas

- Basado en HTTP.
- Compatible con Spring Boot.
- Fácil integración.

### Desventajas

- Puede requerir varias solicitudes.


## GraphQL

### Ventajas

- Consultas flexibles.

### Desventajas

- Mayor complejidad.

## Mensajería (Kafka/RabbitMQ)

### Ventajas

- Comunicación asíncrona.

### Desventajas

- Mayor infraestructura.


# 4. Decisión

Se utilizará REST con:

- Spring Boot.
- JSON.
- HTTP Methods.
- JWT para seguridad.

Métodos utilizados:

- GET.
- POST.
- PUT.
- DELETE.

# 5. Consecuencias

## Positivas

- Fácil integración.
- Amplio soporte.
- Desarrollo rápido.

## Negativas

- Puede aumentar tráfico en operaciones complejas.
- Requiere documentación de APIs.