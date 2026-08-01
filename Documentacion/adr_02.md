# ADR-002: Uso de Docker + Docker Compose

**Estado:** Aprobado  

# 1. Contexto

El sistema está compuesto por:

- Aplicación Angular.
- Microservicios Spring Boot.
- Bases de datos PostgreSQL.
- Servicios complementarios.

Cada componente requiere un ambiente consistente para desarrollo, pruebas y producción.


# 2. Problema

La instalación manual puede provocar:

- Diferencias entre ambientes.
- Errores de configuración.
- Problemas con versiones.
- Mayor tiempo de instalación.

Se requiere una solución que permita ejecutar todos los componentes de manera uniforme.


# 3. Alternativas consideradas

## Alternativa 1: Instalación tradicional

Instalar cada tecnología directamente en el servidor.

### Ventajas

- Sin herramientas adicionales.

### Desventajas

- Configuración manual.
- Problemas de compatibilidad.


## Alternativa 2: Máquinas virtuales

Crear una máquina virtual por servicio.

### Ventajas

- Alto aislamiento.

### Desventajas

- Mayor consumo de recursos.

## Alternativa 3: Docker + Docker Compose

Contenerizar los servicios del sistema.

### Ventajas

- Portabilidad.
- Fácil despliegue.
- Ambientes reproducibles.

### Desventajas

- Requiere conocimientos de contenedores.


# 4. Decisión

Se utilizará Docker Compose para administrar:

- Frontend Angular.
- Microservicios Spring Boot.
- Bases PostgreSQL.
- Servicios auxiliares.

# 5. Consecuencias

## Positivas

- Instalación rápida.
- Mayor portabilidad.
- Facilita pruebas.

## Negativas

- Administración adicional de imágenes.
- Mayor conocimiento técnico requerido.