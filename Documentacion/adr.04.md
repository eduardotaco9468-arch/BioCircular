# ADR-004: Uso de JWT para Autenticación

**Estado:** Aprobado  

# 1. Contexto

El sistema requiere controlar acceso para:

- Administradores.
- Operadores.
- Técnicos.
- Clientes.

Se necesita seguridad basada en roles y permisos.


# 2. Problema

Se requiere:

- Identificación de usuarios.
- Protección de APIs.
- Control de acceso.
- Escalabilidad en microservicios.


# 3. Alternativas consideradas

## Sesiones tradicionales

### Ventajas

- Implementación sencilla.

### Desventajas

- Dificultad en arquitecturas distribuidas.


## OAuth2

### Ventajas

- Estándar empresarial.

### Desventajas

- Mayor complejidad.


## JWT

### Ventajas

- Sin estado.
- Compatible con microservicios.
- Fácil integración con Angular.

### Desventajas

- Requiere manejo seguro de tokens.


# 4. Decisión

Se utilizará:

- Spring Security.
- JWT.
- BCrypt.
- RBAC.

Flujo:

1. Usuario envía credenciales.
2. Servicio valida información.
3. Se genera token JWT.
4. Cliente utiliza token para consumir APIs.


# 5. Consecuencias

## Positivas

- Seguridad en servicios.
- Escalabilidad.
- Separación de autenticación.

## Negativas

- Gestión de expiración de tokens.
- Protección de claves secretas.