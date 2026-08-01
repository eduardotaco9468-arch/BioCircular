CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE tipo_residuo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(250),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingreso_residuo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recoleccion_externa_id UUID UNIQUE,
  tipo_residuo_id UUID NOT NULL,
  recibido_por_usuario_externo_id UUID NOT NULL,
  fecha_hora_recepcion TIMESTAMPTZ NOT NULL,
  peso_kg NUMERIC(12,2) NOT NULL,
  observacion TEXT,
  CONSTRAINT fk_ingreso_tipo FOREIGN KEY (tipo_residuo_id) REFERENCES tipo_residuo(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_ingreso_peso CHECK (peso_kg > 0)
);

CREATE TABLE lote (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(40) NOT NULL UNIQUE,
  estado VARCHAR(15) NOT NULL DEFAULT 'EN_PROCESO',
  fecha_inicio DATE NOT NULL,
  fecha_cierre DATE,
  creado_por_usuario_externo_id UUID NOT NULL,
  CONSTRAINT ck_lote_estado CHECK (estado IN ('EN_PROCESO','FINALIZADO','CANCELADO')),
  CONSTRAINT ck_lote_fechas CHECK (fecha_cierre IS NULL OR fecha_cierre >= fecha_inicio)
);

CREATE TABLE lote_ingreso_residuo (
  lote_id UUID NOT NULL, ingreso_residuo_id UUID NOT NULL,
  PRIMARY KEY (lote_id, ingreso_residuo_id),
  CONSTRAINT fk_lote_ingreso_lote FOREIGN KEY (lote_id) REFERENCES lote(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_lote_ingreso_ingreso FOREIGN KEY (ingreso_residuo_id) REFERENCES ingreso_residuo(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE etapa_compostaje (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  orden SMALLINT NOT NULL UNIQUE,
  descripcion VARCHAR(250),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT ck_etapa_orden CHECK (orden > 0)
);

CREATE TABLE lote_etapa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lote_id UUID NOT NULL, etapa_id UUID NOT NULL,
  fecha_inicio TIMESTAMPTZ NOT NULL,
  fecha_fin TIMESTAMPTZ,
  estado VARCHAR(15) NOT NULL DEFAULT 'EN_PROCESO',
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responsable_usuario_externo_id UUID NOT NULL,
  CONSTRAINT fk_lote_etapa_lote FOREIGN KEY (lote_id) REFERENCES lote(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_lote_etapa_etapa FOREIGN KEY (etapa_id) REFERENCES etapa_compostaje(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT uq_lote_etapa UNIQUE (lote_id, etapa_id),
  CONSTRAINT ck_lote_etapa_estado CHECK (estado IN ('PENDIENTE','EN_PROCESO','FINALIZADA')),
  CONSTRAINT ck_lote_etapa_fechas CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
);

CREATE TABLE observacion_etapa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lote_etapa_id UUID NOT NULL,
  responsable_usuario_externo_id UUID NOT NULL,
  fecha_hora TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  nota_tecnica TEXT NOT NULL,
  CONSTRAINT fk_observacion_lote_etapa FOREIGN KEY (lote_etapa_id) REFERENCES lote_etapa(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE compost (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lote_id UUID NOT NULL UNIQUE,
  fecha_produccion DATE NOT NULL,
  cantidad_kg NUMERIC(12,2) NOT NULL,
  apto_entrega BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_compost_lote FOREIGN KEY (lote_id) REFERENCES lote(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_compost_cantidad CHECK (cantidad_kg > 0)
);

CREATE TABLE movimiento_inventario_compost (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compost_id UUID NOT NULL,
  tipo VARCHAR(10) NOT NULL,
  cantidad_kg NUMERIC(12,2) NOT NULL,
  fecha_hora TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  motivo VARCHAR(250) NOT NULL,
  usuario_externo_id UUID NOT NULL,
  CONSTRAINT fk_movimiento_compost FOREIGN KEY (compost_id) REFERENCES compost(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT ck_movimiento_tipo CHECK (tipo IN ('INGRESO','SALIDA','AJUSTE')),
  CONSTRAINT ck_movimiento_cantidad CHECK (cantidad_kg > 0)
);

CREATE INDEX ix_ingreso_fecha_tipo ON ingreso_residuo (fecha_hora_recepcion DESC, tipo_residuo_id);
CREATE INDEX ix_lote_estado_inicio ON lote (estado, fecha_inicio DESC);
CREATE INDEX ix_lote_ingreso_ingreso ON lote_ingreso_residuo (ingreso_residuo_id);
CREATE INDEX ix_lote_etapa_lote_estado ON lote_etapa (lote_id, estado);
CREATE INDEX ix_observacion_etapa_fecha ON observacion_etapa (lote_etapa_id, fecha_hora DESC);
CREATE INDEX ix_compost_apto_fecha ON compost (apto_entrega, fecha_produccion DESC);
CREATE INDEX ix_movimiento_compost_fecha ON movimiento_inventario_compost (compost_id, fecha_hora DESC);
