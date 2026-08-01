CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE reporte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo VARCHAR(30) NOT NULL,
  formato_solicitado VARCHAR(10) NOT NULL,
  periodo_desde DATE NOT NULL,
  periodo_hasta DATE NOT NULL,
  filtros JSONB NOT NULL DEFAULT '{}'::jsonb,
  estado VARCHAR(15) NOT NULL DEFAULT 'SOLICITADO',
  solicitado_por_usuario_externo_id UUID NOT NULL,
  solicitado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  generado_en TIMESTAMPTZ,
  CONSTRAINT ck_reporte_tipo CHECK (tipo IN ('RECOLECCION','COMPOSTAJE','AMBIENTAL','RESUMEN_GENERAL')),
  CONSTRAINT ck_reporte_formato CHECK (formato_solicitado IN ('PDF','XLSX')),
  CONSTRAINT ck_reporte_estado CHECK (estado IN ('SOLICITADO','GENERADO','FALLIDO')),
  CONSTRAINT ck_reporte_periodo CHECK (periodo_hasta >= periodo_desde),
  CONSTRAINT ck_reporte_generado CHECK (generado_en IS NULL OR generado_en >= solicitado_en)
);

CREATE TABLE exportacion_reporte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporte_id UUID NOT NULL,
  formato VARCHAR(10) NOT NULL,
  ubicacion VARCHAR(500) NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  tamano_bytes BIGINT,
  checksum_sha256 CHAR(64),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiracion_en TIMESTAMPTZ,
  CONSTRAINT fk_exportacion_reporte FOREIGN KEY (reporte_id) REFERENCES reporte(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT ck_exportacion_formato CHECK (formato IN ('PDF','XLSX')),
  CONSTRAINT ck_exportacion_tamano CHECK (tamano_bytes IS NULL OR tamano_bytes > 0),
  CONSTRAINT ck_exportacion_expiracion CHECK (expiracion_en IS NULL OR expiracion_en > creado_en)
);

CREATE TABLE indicador_ambiental (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(50) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  valor NUMERIC(18,4) NOT NULL,
  unidad VARCHAR(20) NOT NULL,
  periodo_desde DATE NOT NULL,
  periodo_hasta DATE NOT NULL,
  dimension VARCHAR(20) NOT NULL DEFAULT 'GLOBAL',
  referencia_externa_id UUID,
  calculado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_indicador_periodo UNIQUE (codigo, periodo_desde, periodo_hasta, dimension, referencia_externa_id),
  CONSTRAINT ck_indicador_periodo CHECK (periodo_hasta >= periodo_desde),
  CONSTRAINT ck_indicador_dimension CHECK (dimension IN ('GLOBAL','CLIENTE','SECTOR'))
);

CREATE INDEX ix_reporte_estado_solicitado ON reporte (estado, solicitado_en DESC);
CREATE INDEX ix_reporte_tipo_periodo ON reporte (tipo, periodo_desde, periodo_hasta);
CREATE INDEX ix_exportacion_reporte ON exportacion_reporte (reporte_id);
CREATE INDEX ix_indicador_consulta ON indicador_ambiental (codigo, periodo_desde, periodo_hasta);
