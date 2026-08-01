CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE rol (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  descripcion VARCHAR(250),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT ck_rol_codigo CHECK (codigo = upper(codigo))
);

CREATE TABLE permiso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(80) NOT NULL UNIQUE,
  modulo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(250) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT ck_permiso_codigo CHECK (codigo = upper(codigo))
);

CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(254) NOT NULL,
  contrasena_hash VARCHAR(255) NOT NULL,
  cargo VARCHAR(100),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  ultimo_acceso_en TIMESTAMPTZ,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_usuario_correo UNIQUE (correo),
  CONSTRAINT ck_usuario_correo CHECK (correo = lower(correo) AND correo ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
);

CREATE TABLE usuario_rol (
  usuario_id UUID NOT NULL,
  rol_id UUID NOT NULL,
  asignado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, rol_id),
  CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_usuario_rol_rol FOREIGN KEY (rol_id) REFERENCES rol(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE rol_permiso (
  rol_id UUID NOT NULL,
  permiso_id UUID NOT NULL,
  PRIMARY KEY (rol_id, permiso_id),
  CONSTRAINT fk_rol_permiso_rol FOREIGN KEY (rol_id) REFERENCES rol(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rol_permiso_permiso FOREIGN KEY (permiso_id) REFERENCES permiso(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE recuperacion_contrasena (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  expira_en TIMESTAMPTZ NOT NULL,
  usado_en TIMESTAMPTZ,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_recuperacion_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT ck_recuperacion_expira CHECK (expira_en > creado_en),
  CONSTRAINT ck_recuperacion_uso CHECK (usado_en IS NULL OR usado_en >= creado_en)
);

CREATE INDEX ix_usuario_activo ON usuario (activo) WHERE activo;
CREATE INDEX ix_usuario_rol_rol ON usuario_rol (rol_id);
CREATE INDEX ix_rol_permiso_permiso ON rol_permiso (permiso_id);
CREATE INDEX ix_recuperacion_usuario_expira ON recuperacion_contrasena (usuario_id, expira_en DESC);

CREATE OR REPLACE FUNCTION actualizar_actualizado_en() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.actualizado_en = CURRENT_TIMESTAMP; RETURN NEW; END; $$;
CREATE TRIGGER trg_usuario_actualizado_en BEFORE UPDATE ON usuario FOR EACH ROW EXECUTE FUNCTION actualizar_actualizado_en();
