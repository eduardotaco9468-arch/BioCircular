CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE cliente (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(30) NOT NULL UNIQUE,
  tipo VARCHAR(15) NOT NULL,
  nombre VARCHAR(160) NOT NULL,
  identificacion VARCHAR(30) NOT NULL UNIQUE,
  direccion VARCHAR(250) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  telefono VARCHAR(30), correo VARCHAR(254),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT ck_cliente_tipo CHECK (tipo IN ('RESIDENCIAL','COMERCIAL')),
  CONSTRAINT ck_cliente_correo CHECK (correo IS NULL OR correo = lower(correo))
);

CREATE TABLE contenedor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL,
  codigo VARCHAR(40) NOT NULL UNIQUE,
  capacidad NUMERIC(10,2) NOT NULL,
  unidad_capacidad VARCHAR(5) NOT NULL DEFAULT 'L',
  estado VARCHAR(15) NOT NULL DEFAULT 'ACTIVO',
  fecha_entrega DATE NOT NULL,
  fecha_retiro DATE,
  CONSTRAINT fk_contenedor_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_contenedor_capacidad CHECK (capacidad > 0),
  CONSTRAINT ck_contenedor_unidad CHECK (unidad_capacidad IN ('L','KG')),
  CONSTRAINT ck_contenedor_estado CHECK (estado IN ('ACTIVO','DANADO','RETIRADO')),
  CONSTRAINT ck_contenedor_fechas CHECK (fecha_retiro IS NULL OR fecha_retiro >= fecha_entrega)
);

CREATE TABLE operador (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_externo_id UUID NOT NULL UNIQUE,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(30),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehiculo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placa VARCHAR(10) NOT NULL UNIQUE,
  modelo VARCHAR(100) NOT NULL,
  marca VARCHAR(100),
  capacidad_carga NUMERIC(10,2) NOT NULL,
  unidad_capacidad VARCHAR(5) NOT NULL DEFAULT 'KG',
  estado VARCHAR(15) NOT NULL DEFAULT 'OPERATIVO',
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT ck_vehiculo_capacidad CHECK (capacidad_carga > 0),
  CONSTRAINT ck_vehiculo_unidad CHECK (unidad_capacidad IN ('KG','T')),
  CONSTRAINT ck_vehiculo_estado CHECK (estado IN ('OPERATIVO','MANTENIMIENTO','FUERA_SERVICIO'))
);

CREATE TABLE mantenimiento_vehiculo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehiculo_id UUID NOT NULL,
  fecha DATE NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  taller VARCHAR(150),
  detalle TEXT NOT NULL,
  costo NUMERIC(12,2),
  CONSTRAINT fk_mantenimiento_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculo(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_mantenimiento_tipo CHECK (tipo IN ('PREVENTIVO','CORRECTIVO','INSPECCION')),
  CONSTRAINT ck_mantenimiento_costo CHECK (costo IS NULL OR costo >= 0)
);

CREATE TABLE ruta_recoleccion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(30) NOT NULL UNIQUE,
  sector VARCHAR(100) NOT NULL,
  frecuencia VARCHAR(30) NOT NULL,
  fecha_programada DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  vehiculo_id UUID,
  estado VARCHAR(15) NOT NULL DEFAULT 'PLANIFICADA',
  CONSTRAINT fk_ruta_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculo(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_ruta_estado CHECK (estado IN ('PLANIFICADA','EN_CURSO','FINALIZADA','CANCELADA')),
  CONSTRAINT ck_ruta_horas CHECK (hora_fin > hora_inicio)
);

CREATE TABLE ruta_operador (
  ruta_id UUID NOT NULL, operador_id UUID NOT NULL,
  asignado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ruta_id, operador_id),
  CONSTRAINT fk_ruta_operador_ruta FOREIGN KEY (ruta_id) REFERENCES ruta_recoleccion(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ruta_operador_operador FOREIGN KEY (operador_id) REFERENCES operador(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE parada_ruta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ruta_id UUID NOT NULL, cliente_id UUID NOT NULL,
  orden SMALLINT NOT NULL, hora_estimada TIME,
  CONSTRAINT fk_parada_ruta FOREIGN KEY (ruta_id) REFERENCES ruta_recoleccion(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_parada_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT uq_parada_orden UNIQUE (ruta_id, orden),
  CONSTRAINT uq_parada_cliente UNIQUE (ruta_id, cliente_id),
  CONSTRAINT ck_parada_orden CHECK (orden > 0)
);

CREATE TABLE recoleccion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ruta_id UUID, cliente_id UUID NOT NULL, contenedor_id UUID,
  operador_id UUID NOT NULL, fecha_hora TIMESTAMPTZ NOT NULL,
  cantidad NUMERIC(12,2), unidad VARCHAR(5), notas TEXT,
  estado VARCHAR(15) NOT NULL DEFAULT 'CONFIRMADA',
  CONSTRAINT fk_recoleccion_ruta FOREIGN KEY (ruta_id) REFERENCES ruta_recoleccion(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_recoleccion_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_recoleccion_contenedor FOREIGN KEY (contenedor_id) REFERENCES contenedor(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_recoleccion_operador FOREIGN KEY (operador_id) REFERENCES operador(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_recoleccion_cantidad CHECK (cantidad IS NULL OR cantidad > 0),
  CONSTRAINT ck_recoleccion_unidad CHECK (unidad IS NULL OR unidad IN ('KG','T','L')),
  CONSTRAINT ck_recoleccion_estado CHECK (estado IN ('CONFIRMADA','INCIDENTE','CANCELADA')),
  CONSTRAINT ck_recoleccion_medicion CHECK ((cantidad IS NULL AND unidad IS NULL) OR (cantidad IS NOT NULL AND unidad IS NOT NULL))
);

CREATE TABLE incidente_recoleccion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), recoleccion_id UUID NOT NULL,
  tipo VARCHAR(30) NOT NULL, descripcion TEXT NOT NULL, reportado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_incidente_recoleccion FOREIGN KEY (recoleccion_id) REFERENCES recoleccion(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT ck_incidente_tipo CHECK (tipo IN ('CLIENTE_AUSENTE','MALA_CLASIFICACION','CONTENEDOR_DANADO','OTRO'))
);

CREATE INDEX ix_cliente_sector_activo ON cliente (sector, activo);
CREATE INDEX ix_contenedor_cliente_estado ON contenedor (cliente_id, estado);
CREATE INDEX ix_mantenimiento_vehiculo_fecha ON mantenimiento_vehiculo (vehiculo_id, fecha DESC);
CREATE INDEX ix_ruta_fecha_sector ON ruta_recoleccion (fecha_programada, sector);
CREATE INDEX ix_ruta_operador_operador ON ruta_operador (operador_id);
CREATE INDEX ix_parada_cliente ON parada_ruta (cliente_id);
CREATE INDEX ix_recoleccion_cliente_fecha ON recoleccion (cliente_id, fecha_hora DESC);
CREATE INDEX ix_recoleccion_operador_fecha ON recoleccion (operador_id, fecha_hora DESC);
CREATE INDEX ix_recoleccion_ruta ON recoleccion (ruta_id);
CREATE INDEX ix_incidente_recoleccion ON incidente_recoleccion (recoleccion_id);
