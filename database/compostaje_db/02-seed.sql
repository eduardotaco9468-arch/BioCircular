INSERT INTO tipo_residuo (codigo, nombre, descripcion) VALUES
  ('RESTOS_ALIMENTOS', 'Restos de alimentos', 'Residuos orgánicos de preparación y consumo'),
  ('PODAS', 'Podas y hojas', 'Material vegetal de jardines y áreas verdes'),
  ('MERCADO', 'Residuos de mercado', 'Frutas, verduras y material vegetal apto');

INSERT INTO etapa_compostaje (codigo, nombre, orden, descripcion) VALUES
  ('RECEPCION', 'Recepción y preparación', 1, 'Recepción, clasificación y preparación de material'),
  ('DESCOMPOSICION', 'Descomposición activa', 2, 'Etapa de transformación biológica activa'),
  ('MADURACION', 'Maduración', 3, 'Estabilización del material compostado'),
  ('FINALIZACION', 'Finalización', 4, 'Control final y liberación del compost');
