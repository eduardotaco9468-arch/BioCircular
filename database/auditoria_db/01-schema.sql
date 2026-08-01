CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE evento_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_externo_id UUID,
  correo_usuario VARCHAR(254),
  accion VARCHAR(80) NOT NULL,
  modulo VARCHAR(50) NOT NULL,
  recurso_tipo VARCHAR(80) NOT NULL,
  recurso_externo_id UUID,
  fecha_hora TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  direccion_ip INET,
  resultado VARCHAR(10) NOT NULL DEFAULT 'EXITOSO',
  descripcion TEXT NOT NULL,
  detalles JSONB NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT ck_auditoria_resultado CHECK (resultado IN ('EXITOSO','FALLIDO'))
);

CREATE INDEX ix_auditoria_usuario_fecha ON evento_auditoria (usuario_externo_id, fecha_hora DESC);
CREATE INDEX ix_auditoria_modulo_fecha ON evento_auditoria (modulo, fecha_hora DESC);
CREATE INDEX ix_auditoria_recurso ON evento_auditoria (recurso_tipo, recurso_externo_id);
CREATE INDEX ix_auditoria_fecha ON evento_auditoria (fecha_hora DESC);
