# Diseño de bases de datos PostgreSQL

## Alcance y criterios

El diseño cubre RF01–RF42 y conserva el límite **Database per Service**: `auth_db`, `gestion_db`, `compostaje_db`, `reportes_db` y `auditoria_db`. Las claves con sufijo `_externo_id` son UUID de referencia lógica a otro microservicio; no son claves foráneas y no habilitan acceso entre bases.

Convenciones: las claves primarias son `UUID` con `gen_random_uuid()`; las fechas operativas usan `TIMESTAMPTZ`; importes y cantidades usan `NUMERIC`, no `FLOAT`; el borrado de datos maestros se restringe para preservar historia. Los catálogos pequeños y estables se protegen con `CHECK`; los que tienen administración propia son tablas normalizadas.

## Cobertura de requisitos

| RF | Persistencia que lo soporta |
|---|---|
| RF01–RF04 | `gestion_db.cliente` (baja lógica mediante `activo`). |
| RF05 | `gestion_db.contenedor`. |
| RF06–RF08 | `ruta_recoleccion`, `ruta_operador` y `parada_ruta`. |
| RF09–RF11 | `recoleccion` e `incidente_recoleccion`. |
| RF12–RF14 | `ingreso_residuo`, `lote`, `lote_ingreso_residuo`, `lote_etapa` y `compost`. |
| RF15–RF17, RF23, RF42 | `reporte`, `exportacion_reporte` e `indicador_ambiental`; los insumos se consultan por REST a sus propietarios. |
| RF18–RF19 | `recoleccion` y `indicador_ambiental` de dimensión `CLIENTE`. |
| RF20–RF22, RF36–RF38 | `usuario`, `rol`, `permiso`, tablas puente y `recuperacion_contrasena`. |
| RF24 | `compost` y `movimiento_inventario_compost`. |
| RF25 | No requiere persistencia en las cinco bases definidas; se delega a `notificaciones-service`. |
| RF26 | Índices de clientes, rutas, recolecciones, lotes y auditoría. |
| RF27–RF28 | `lote_ingreso_residuo`, `lote_etapa` y `observacion_etapa`. |
| RF29–RF35 | `vehiculo` y `mantenimiento_vehiculo`. |
| RF39–RF41 | `tipo_residuo`. |

## Modelo entidad-relación y relaciones

### auth_db

`usuario` se relaciona N:M con `rol` mediante `usuario_rol`; `rol` se relaciona N:M con `permiso` mediante `rol_permiso`. Un `usuario` tiene 0:N solicitudes de `recuperacion_contrasena`. Esto normaliza RBAC sin duplicar permisos en los usuarios.

### gestion_db

Un `cliente` tiene 0:N `contenedor` y 0:N `recoleccion`. Un `vehiculo` tiene 0:N mantenimientos y puede estar asignado a 0:N rutas. Una `ruta_recoleccion` tiene N:M `operador` mediante `ruta_operador` y 1:N `parada_ruta`; cada parada identifica un cliente y su orden. Una `recoleccion` puede tener 0:N `incidente_recoleccion`.

### compostaje_db

Un `tipo_residuo` clasifica 0:N `ingreso_residuo`. `lote` e `ingreso_residuo` son N:M mediante `lote_ingreso_residuo`, preservando trazabilidad de mezcla. Un lote tiene 0:N `lote_etapa`; una etapa de catálogo puede aparecer en muchos lotes. Un `lote_etapa` tiene 0:N observaciones. Un lote tiene 0:1 `compost`, y un compost tiene 0:N movimientos de inventario.

### reportes_db y auditoria_db

Un `reporte` tiene 0:N `exportacion_reporte`. `indicador_ambiental` es un snapshot independiente por código, período y dimensión. `evento_auditoria` es una entidad inmutable de eventos; conserva identificadores externos sin FK entre servicios.

## Modelo lógico y diccionario de datos

Leyenda: `PK` clave primaria, `FK` clave foránea local, `UQ` único, `NN` no nulo. Los valores entre paréntesis después del tipo son longitud o precisión. `—` indica que permite NULL y no tiene valor por defecto.

### auth_db

| Tabla | Campo | Tipo | Nulidad / predeterminado | Restricciones y descripción |
|---|---|---|---|---|
| rol | id | UUID | NN / `gen_random_uuid()` | PK; identificador del rol. |
| rol | codigo | VARCHAR(30) | NN | UQ, `CHECK` mayúsculas; código estable. |
| rol | nombre, descripcion | VARCHAR(80), VARCHAR(250) | NN, — | `nombre` UQ; etiqueta y detalle. |
| rol | activo, creado_en | BOOLEAN, TIMESTAMPTZ | NN / `true`, NN / actual | Baja lógica y auditoría temporal. |
| permiso | id | UUID | NN / generado | PK. |
| permiso | codigo, modulo, descripcion | VARCHAR(80), VARCHAR(50), VARCHAR(250) | NN | `codigo` UQ y mayúsculas; acción autorizable. |
| permiso | activo | BOOLEAN | NN / `true` | Control de vigencia. |
| usuario | id | UUID | NN / generado | PK. |
| usuario | nombres, apellidos | VARCHAR(100) | NN | Datos personales. |
| usuario | correo | VARCHAR(254) | NN | UQ, minúsculas y patrón de correo. |
| usuario | contrasena_hash | VARCHAR(255) | NN | Solo hash; nunca contraseña en claro. |
| usuario | cargo | VARCHAR(100) | — | Cargo organizacional. |
| usuario | activo | BOOLEAN | NN / `true` | Revocación de acceso (RF38). |
| usuario | ultimo_acceso_en, creado_en, actualizado_en | TIMESTAMPTZ | —, NN / actual, NN / actual | Trazabilidad de cuenta; trigger mantiene actualización. |
| usuario_rol | usuario_id, rol_id | UUID | NN | PK compuesta; FK a `usuario` y `rol`; `CASCADE` al borrar usuario, `RESTRICT` al rol. |
| usuario_rol | asignado_en | TIMESTAMPTZ | NN / actual | Fecha de asignación. |
| rol_permiso | rol_id, permiso_id | UUID | NN | PK compuesta; FKs locales; `CASCADE` al rol. |
| recuperacion_contrasena | id | UUID | NN / generado | PK. |
| recuperacion_contrasena | usuario_id | UUID | NN | FK a usuario, `CASCADE`. |
| recuperacion_contrasena | token_hash | VARCHAR(255) | NN | UQ; token almacenado solo como hash. |
| recuperacion_contrasena | expira_en, usado_en, creado_en | TIMESTAMPTZ | NN, —, NN / actual | `CHECK` de expiración y uso válido. |

### gestion_db

| Tabla | Campo | Tipo | Nulidad / predeterminado | Restricciones y descripción |
|---|---|---|---|---|
| cliente | id | UUID | NN / generado | PK. |
| cliente | codigo, identificacion | VARCHAR(30) | NN | UQ; códigos de negocio. |
| cliente | tipo | VARCHAR(15) | NN | `CHECK`: `RESIDENCIAL` o `COMERCIAL`. |
| cliente | nombre | VARCHAR(160) | NN | Nombre o razón social. |
| cliente | direccion, sector | VARCHAR(250), VARCHAR(100) | NN | Ubicación para servicio y filtros. |
| cliente | telefono, correo | VARCHAR(30), VARCHAR(254) | — | Correo normalizado a minúsculas si existe. |
| cliente | activo, creado_en, actualizado_en | BOOLEAN, TIMESTAMPTZ, TIMESTAMPTZ | NN / true, NN / actual, NN / actual | Baja lógica y trazabilidad. |
| contenedor | id | UUID | NN / generado | PK. |
| contenedor | cliente_id | UUID | NN | FK a cliente, `RESTRICT`; propietario actual. |
| contenedor | codigo | VARCHAR(40) | NN | UQ. |
| contenedor | capacidad, unidad_capacidad | NUMERIC(10,2), VARCHAR(5) | NN, NN / `L` | Capacidad positiva; `L` o `KG`. |
| contenedor | estado | VARCHAR(15) | NN / `ACTIVO` | `CHECK`: activo, dañado o retirado. |
| contenedor | fecha_entrega, fecha_retiro | DATE | NN, — | Retiro no anterior a entrega. |
| operador | id | UUID | NN / generado | PK local. |
| operador | usuario_externo_id | UUID | NN | UQ; referencia lógica a `auth_db.usuario`. |
| operador | codigo, nombres, apellidos | VARCHAR(30), VARCHAR(100), VARCHAR(100) | NN | Código UQ y datos operativos. |
| operador | telefono, activo, creado_en | VARCHAR(30), BOOLEAN, TIMESTAMPTZ | —, NN / true, NN / actual | Contacto y vigencia. |
| vehiculo | id | UUID | NN / generado | PK. |
| vehiculo | placa | VARCHAR(10) | NN | UQ. |
| vehiculo | modelo, marca | VARCHAR(100) | NN, — | Identificación de flota. |
| vehiculo | capacidad_carga, unidad_capacidad | NUMERIC(10,2), VARCHAR(5) | NN | Capacidad positiva; `KG` o `T`. |
| vehiculo | estado, activo | VARCHAR(15), BOOLEAN | NN / `OPERATIVO`, NN / true | Estado con `CHECK`; baja lógica. |
| vehiculo | creado_en, actualizado_en | TIMESTAMPTZ | NN / actual | Trazabilidad. |
| mantenimiento_vehiculo | id | UUID | NN / generado | PK. |
| mantenimiento_vehiculo | vehiculo_id | UUID | NN | FK a vehículo, `RESTRICT`. |
| mantenimiento_vehiculo | fecha, tipo | DATE, VARCHAR(20) | NN | Tipo: preventivo, correctivo o inspección. |
| mantenimiento_vehiculo | taller, detalle, costo | VARCHAR(150), TEXT, NUMERIC(12,2) | —, NN, — | Costo no negativo. |
| ruta_recoleccion | id | UUID | NN / generado | PK. |
| ruta_recoleccion | codigo | VARCHAR(30) | NN | UQ. |
| ruta_recoleccion | sector, frecuencia | VARCHAR(100), VARCHAR(30) | NN | Planificación de servicio. |
| ruta_recoleccion | fecha_programada, hora_inicio, hora_fin | DATE, TIME, TIME | NN | Fin posterior al inicio. |
| ruta_recoleccion | vehiculo_id | UUID | — | FK a vehículo, `RESTRICT`. |
| ruta_recoleccion | estado | VARCHAR(15) | NN / `PLANIFICADA` | `CHECK` del ciclo operativo. |
| ruta_operador | ruta_id, operador_id | UUID | NN | PK compuesta; FKs a ruta y operador. |
| ruta_operador | asignado_en | TIMESTAMPTZ | NN / actual | Auditoría de asignación. |
| parada_ruta | id | UUID | NN / generado | PK. |
| parada_ruta | ruta_id, cliente_id | UUID | NN | FKs locales; UQ ruta-cliente. |
| parada_ruta | orden | SMALLINT | NN | UQ por ruta y positivo. |
| parada_ruta | hora_estimada | TIME | — | Hora prevista. |
| recoleccion | id | UUID | NN / generado | PK. |
| recoleccion | ruta_id, contenedor_id | UUID | — | FKs locales opcionales. |
| recoleccion | cliente_id, operador_id | UUID | NN | FKs locales; atendido y responsable. |
| recoleccion | fecha_hora | TIMESTAMPTZ | NN | Momento efectivo. |
| recoleccion | cantidad, unidad | NUMERIC(12,2), VARCHAR(5) | — | Ambos nulos o ambos informados; cantidad positiva y unidad KG/T/L. |
| recoleccion | notas, estado | TEXT, VARCHAR(15) | —, NN / `CONFIRMADA` | Estado controlado. |
| incidente_recoleccion | id | UUID | NN / generado | PK. |
| incidente_recoleccion | recoleccion_id | UUID | NN | FK, `CASCADE`; una recolección puede tener varios incidentes. |
| incidente_recoleccion | tipo, descripcion, reportado_en | VARCHAR(30), TEXT, TIMESTAMPTZ | NN, NN, NN / actual | Tipo con `CHECK`, detalle del incidente. |

### compostaje_db

| Tabla | Campo | Tipo | Nulidad / predeterminado | Restricciones y descripción |
|---|---|---|---|---|
| tipo_residuo | id | UUID | NN / generado | PK. |
| tipo_residuo | codigo, nombre | VARCHAR(30), VARCHAR(100) | NN | Ambos UQ. |
| tipo_residuo | descripcion, activo, creado_en | VARCHAR(250), BOOLEAN, TIMESTAMPTZ | —, NN / true, NN / actual | Catálogo administrable. |
| ingreso_residuo | id | UUID | NN / generado | PK. |
| ingreso_residuo | recoleccion_externa_id | UUID | — | UQ; referencia lógica a gestión. |
| ingreso_residuo | tipo_residuo_id | UUID | NN | FK local a tipo, `RESTRICT`. |
| ingreso_residuo | recibido_por_usuario_externo_id | UUID | NN | Referencia lógica a usuario autenticado. |
| ingreso_residuo | fecha_hora_recepcion, peso_kg, observacion | TIMESTAMPTZ, NUMERIC(12,2), TEXT | NN, NN, — | Peso positivo. |
| lote | id | UUID | NN / generado | PK. |
| lote | codigo | VARCHAR(40) | NN | UQ. |
| lote | estado | VARCHAR(15) | NN / `EN_PROCESO` | En proceso, finalizado o cancelado. |
| lote | fecha_inicio, fecha_cierre | DATE | NN, — | Cierre no anterior al inicio. |
| lote | creado_por_usuario_externo_id | UUID | NN | Referencia lógica a auth. |
| lote_ingreso_residuo | lote_id, ingreso_residuo_id | UUID | NN | PK compuesta y FKs locales; puente de trazabilidad. |
| etapa_compostaje | id | UUID | NN / generado | PK. |
| etapa_compostaje | codigo, nombre, orden | VARCHAR(30), VARCHAR(80), SMALLINT | NN | Todos UQ; orden positivo. |
| etapa_compostaje | descripcion, activo | VARCHAR(250), BOOLEAN | —, NN / true | Catálogo de etapas. |
| lote_etapa | id | UUID | NN / generado | PK. |
| lote_etapa | lote_id, etapa_id | UUID | NN | FKs locales y UQ por lote-etapa. |
| lote_etapa | fecha_inicio, fecha_fin | TIMESTAMPTZ | NN, — | Fin no anterior al inicio. |
| lote_etapa | estado | VARCHAR(15) | NN / `EN_PROCESO` | Pendiente, en proceso o finalizada. |
| lote_etapa | actualizado_en | TIMESTAMPTZ | NN / actual | Última actualización. |
| lote_etapa | responsable_usuario_externo_id | UUID | NN | Referencia lógica a auth. |
| observacion_etapa | id | UUID | NN / generado | PK. |
| observacion_etapa | lote_etapa_id | UUID | NN | FK, `CASCADE`. |
| observacion_etapa | responsable_usuario_externo_id, fecha_hora, nota_tecnica | UUID, TIMESTAMPTZ, TEXT | NN, NN / actual, NN | Autor lógico, momento y detalle. |
| compost | id | UUID | NN / generado | PK. |
| compost | lote_id | UUID | NN | FK y UQ: máximo un producto final por lote. |
| compost | fecha_produccion, cantidad_kg, apto_entrega | DATE, NUMERIC(12,2), BOOLEAN | NN, NN, NN / false | Cantidad positiva y disponibilidad. |
| movimiento_inventario_compost | id | UUID | NN / generado | PK. |
| movimiento_inventario_compost | compost_id | UUID | NN | FK a compost, `RESTRICT`. |
| movimiento_inventario_compost | tipo, cantidad_kg | VARCHAR(10), NUMERIC(12,2) | NN | Ingreso, salida o ajuste; cantidad positiva. |
| movimiento_inventario_compost | fecha_hora, motivo, usuario_externo_id | TIMESTAMPTZ, VARCHAR(250), UUID | NN / actual, NN, NN | Kardex del inventario. |

### reportes_db y auditoria_db

| Tabla | Campo | Tipo | Nulidad / predeterminado | Restricciones y descripción |
|---|---|---|---|---|
| reporte | id | UUID | NN / generado | PK. |
| reporte | tipo, formato_solicitado | VARCHAR(30), VARCHAR(10) | NN | Checks: recolección/compostaje/ambiental/resumen; PDF/XLSX. |
| reporte | periodo_desde, periodo_hasta | DATE | NN | Hasta no anterior a desde. |
| reporte | filtros | JSONB | NN / `{}` | Filtros variables sin columnas repetidas. |
| reporte | estado | VARCHAR(15) | NN / `SOLICITADO` | Solicitado, generado o fallido. |
| reporte | solicitado_por_usuario_externo_id | UUID | NN | Referencia lógica a auth. |
| reporte | solicitado_en, generado_en | TIMESTAMPTZ | NN / actual, — | Generación no anterior a solicitud. |
| exportacion_reporte | id | UUID | NN / generado | PK. |
| exportacion_reporte | reporte_id | UUID | NN | FK, `CASCADE`. |
| exportacion_reporte | formato, ubicacion, nombre_archivo | VARCHAR(10), VARCHAR(500), VARCHAR(255) | NN | PDF/XLSX y referencia al artefacto. |
| exportacion_reporte | tamano_bytes, checksum_sha256 | BIGINT, CHAR(64) | — | Tamaño positivo y huella opcional. |
| exportacion_reporte | creado_en, expiracion_en | TIMESTAMPTZ | NN / actual, — | Expiración posterior a creación. |
| indicador_ambiental | id | UUID | NN / generado | PK. |
| indicador_ambiental | codigo, nombre | VARCHAR(50), VARCHAR(120) | NN | Identificador y etiqueta. |
| indicador_ambiental | valor, unidad | NUMERIC(18,4), VARCHAR(20) | NN | Resultado almacenado. |
| indicador_ambiental | periodo_desde, periodo_hasta | DATE | NN | Período válido. |
| indicador_ambiental | dimension, referencia_externa_id | VARCHAR(20), UUID | NN / `GLOBAL`, — | Global, cliente o sector; identidad lógica opcional. |
| indicador_ambiental | calculado_en | TIMESTAMPTZ | NN / actual | Snapshot. UQ por código, período, dimensión y referencia. |
| evento_auditoria | id | UUID | NN / generado | PK. |
| evento_auditoria | usuario_externo_id, correo_usuario | UUID, VARCHAR(254) | — | Actor lógico y copia descriptiva. |
| evento_auditoria | accion, modulo, recurso_tipo | VARCHAR(80), VARCHAR(50), VARCHAR(80) | NN | Qué se hizo y sobre qué recurso. |
| evento_auditoria | recurso_externo_id | UUID | — | Identificador lógico del recurso. |
| evento_auditoria | fecha_hora, direccion_ip | TIMESTAMPTZ, INET | NN / actual, — | Fecha, hora e IP nativa PostgreSQL. |
| evento_auditoria | resultado, descripcion, detalles | VARCHAR(10), TEXT, JSONB | NN / exitoso, NN, NN / `{}` | Resultado con CHECK, mensaje y contexto estructurado. |

## Índices y normalización

Todos los PK, UQ y FK reciben o aprovechan índices. Se añaden índices compuestos para las consultas RF16, RF18, RF26, RF35 y RF42: clientes por sector/activo; rutas por fecha/sector; recolecciones por cliente u operador y fecha; mantenimientos por vehículo/fecha; lotes por estado/inicio; ingresos por fecha/tipo; movimientos por compost/fecha; reportes por estado/período y auditoría por usuario, módulo, recurso y fecha.

El diseño está en 3FN: atributos atómicos, relaciones N:M separadas (`usuario_rol`, `rol_permiso`, `ruta_operador`, `lote_ingreso_residuo`), catálogos independientes y ausencia de atributos derivados almacenados. Los indicadores son snapshots históricos deliberados, no duplicación de datos operativos; sus fuentes permanecen en los servicios dueños.

## Ejecución de scripts

1. Ejecutar `database/00-create-databases.sql` en una instancia PostgreSQL administrativa, o dejar que los cinco contenedores creen sus bases respectivas.
2. En cada base, ejecutar `01-schema.sql` y después `02-seed.sql` de su carpeta.
3. Las FK están declaradas en el mismo `CREATE TABLE` para que la creación sea atómica; no existen FK entre bases por diseño.
