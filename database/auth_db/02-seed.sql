INSERT INTO rol (codigo, nombre, descripcion) VALUES
  ('ADMIN', 'Administrador', 'Administración integral del sistema'),
  ('OPERADOR', 'Operador', 'Operación de rutas y recolecciones'),
  ('TECNICO', 'Técnico', 'Operación del proceso de compostaje'),
  ('CLIENTE', 'Cliente', 'Consulta de su historial y aporte ambiental');

INSERT INTO permiso (codigo, modulo, descripcion) VALUES
  ('USUARIOS_LEER', 'AUTH', 'Consultar usuarios'), ('USUARIOS_GESTIONAR', 'AUTH', 'Crear, editar o desactivar usuarios'),
  ('GESTION_LEER', 'GESTION', 'Consultar operación de recolección'), ('GESTION_GESTIONAR', 'GESTION', 'Administrar operación de recolección'),
  ('COMPOSTAJE_LEER', 'COMPOSTAJE', 'Consultar compostaje'), ('COMPOSTAJE_GESTIONAR', 'COMPOSTAJE', 'Administrar compostaje'),
  ('REPORTES_LEER', 'REPORTES', 'Consultar y descargar reportes'), ('AUDITORIA_LEER', 'AUDITORIA', 'Consultar eventos de auditoría');

INSERT INTO rol_permiso (rol_id, permiso_id)
SELECT r.id, p.id FROM rol r CROSS JOIN permiso p WHERE r.codigo = 'ADMIN';
INSERT INTO rol_permiso (rol_id, permiso_id)
SELECT r.id, p.id FROM rol r JOIN permiso p ON p.codigo IN ('GESTION_LEER','GESTION_GESTIONAR') WHERE r.codigo = 'OPERADOR';
INSERT INTO rol_permiso (rol_id, permiso_id)
SELECT r.id, p.id FROM rol r JOIN permiso p ON p.codigo IN ('COMPOSTAJE_LEER','COMPOSTAJE_GESTIONAR') WHERE r.codigo = 'TECNICO';
INSERT INTO rol_permiso (rol_id, permiso_id)
SELECT r.id, p.id FROM rol r JOIN permiso p ON p.codigo IN ('REPORTES_LEER') WHERE r.codigo = 'CLIENTE';
