# ADR-001: Selección de Arquitectura Basada en Microservicios

**Estado:** Aprobado  

# 1. Contexto

El Sistema de Gestión de Recolección y Compostaje administra diferentes procesos del negocio:

- Gestión de clientes.
- Administración de contenedores.
- Planificación de rutas.
- Registro de recolecciones.
- Gestión del proceso de compostaje.
- Control de inventario de compost.
- Generación de reportes ambientales.
- Administración de usuarios y permisos.
- Auditoría de actividades.

Debido a la cantidad de funcionalidades y al crecimiento esperado del sistema, se requiere una arquitectura que permita separar responsabilidades, facilitar el mantenimiento y permitir la evolución independiente de cada módulo.

La solución utiliza:

- Backend: Spring Boot.
- Frontend: Angular + Bootstrap.
- Base de datos: PostgreSQL independiente por microservicio.


# 2. Problema

Una arquitectura monolítica concentraría todos los módulos dentro de una única aplicación, generando problemas como:

- Alto acoplamiento entre funcionalidades.
- Dificultad para realizar mantenimiento.
- Escalabilidad limitada.
- Mayor impacto ante errores.
- Necesidad de desplegar todo el sistema ante cualquier cambio.

Se necesita una arquitectura que permita dividir el sistema en servicios independientes con responsabilidades específicas.


# 3. Alternativas consideradas

## Alternativa 1: Arquitectura Monolítica

Una aplicación única contiene todos los módulos.

### Ventajas

- Implementación inicial sencilla.
- Menor complejidad de infraestructura.

### Desventajas

- Difícil escalabilidad.
- Alto acoplamiento.
- Cambios afectan todo el sistema.


## Alternativa 2: Arquitectura Orientada a Servicios (SOA)

Separación del sistema mediante servicios empresariales.

### Ventajas

- Reutilización de servicios.
- Separación funcional.

### Desventajas

- Mayor complejidad.
- Requiere infraestructura adicional.


## Alternativa 3: Arquitectura de Microservicios

División del sistema en servicios independientes:

- Servicio de Autenticación.
- Servicio de Gestión.
- Servicio de Compostaje.
- Servicio de Reportes.
- Servicio de Notificaciones.
- Servicio de Auditoría.
- Servicio de Monitoreo.

### Ventajas

- Escalabilidad independiente.
- Bajo acoplamiento.
- Mantenimiento más sencillo.
- Despliegue independiente.

### Desventajas

- Mayor complejidad inicial.
- Requiere monitoreo.


# 4. Decisión

Se implementará una arquitectura basada en microservicios.

Cada microservicio tendrá:

- Responsabilidad propia.
- Código independiente.
- Base de datos propia.
- APIs REST para comunicación.

La distribución será:

| Microservicio | Responsabilidad |
|---|---|
| Servicio de Autenticación | Usuarios, roles, permisos y JWT |
| Servicio de Gestión | Clientes, rutas, contenedores y recolecciones |
| Servicio de Compostaje | Lotes, trazabilidad e inventario |
| Servicio de Reportes | Indicadores y documentos |
| Servicio de Notificaciones | Alertas del sistema |
| Servicio de Auditoría | Registro de actividades |
| Servicio de Monitoreo | Estado de servicios |


# 5. Consecuencias

## Positivas

- Mayor escalabilidad.
- Separación clara de responsabilidades.
- Facilita mantenimiento.
- Permite evolución independiente.

## Negativas

- Mayor complejidad de despliegue.
- Necesidad de monitoreo.
- Mayor configuración inicial.