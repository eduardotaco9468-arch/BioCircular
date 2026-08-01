# ADR-003: Selección de PostgreSQL como Base de Datos

**Estado:** Aprobado  

# 1. Contexto

El sistema necesita almacenar información relacionada con:

- Clientes.
- Contenedores.
- Rutas.
- Recolecciones.
- Lotes de compostaje.
- Inventario.
- Reportes.
- Auditoría.

Cada microservicio tendrá una base de datos independiente.


# 2. Problema

Se requiere un motor de base de datos que permita:

- Seguridad.
- Integridad de información.
- Manejo de relaciones complejas.
- Buen rendimiento.

# 3. Alternativas consideradas

## MySQL

### Ventajas

- Amplio uso empresarial.
- Fácil administración.

### Desventajas

- Menor soporte para ciertas funcionalidades avanzadas.


## MongoDB

### Ventajas

- Modelo flexible.

### Desventajas

- Menor adaptación para datos relacionales.


## PostgreSQL

### Ventajas

- Código abierto.
- Alta estabilidad.
- Soporte de transacciones.
- Compatible con Spring Data JPA.

### Desventajas

- Requiere administración especializada.

# 4. Decisión

Se utilizará PostgreSQL.

Bases definidas:

- Base de Datos Autenticación.
- Base de Datos Gestión.
- Base de Datos Compostaje.
- Base de Datos Reportes.
- Base de Datos Auditoría.


# 5. Consecuencias

## Positivas

- Alta confiabilidad.
- Independencia entre servicios.
- Buen rendimiento.

## Negativas

- Mayor cantidad de bases administradas.
- Requiere estrategia de respaldo.