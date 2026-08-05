import { Injectable } from '@angular/core';
import { Reporte, ReporteCompost, ReporteIncidencia, ReporteRecoleccion } from '../models/reporte.model';
@Injectable({ providedIn: 'root' })
export class ReporteService {
  obtenerResumen(): Reporte[] { return [
    { id: 1, titulo: 'Total clientes', valor: 500, descripcion: 'Clientes registrados', tipo: 'Clientes' },
    { id: 2, titulo: 'Total recolecciones', valor: 320, descripcion: 'Recolecciones realizadas', tipo: 'Recolecciones' },
    { id: 3, titulo: 'Incidencias pendientes', valor: 15, descripcion: 'Requieren atención', tipo: 'Incidencias' },
    { id: 4, titulo: 'Producción compost', valor: 1200, descripcion: 'Kilogramos producidos', tipo: 'Compost' }
  ]; }
  obtenerEstadisticasRecoleccion(): ReporteRecoleccion[] { return [{ fecha: '2026-08-01', sector: 'Centro', estado: 'Completada', cantidad: 120 }, { fecha: '2026-08-02', sector: 'Norte', estado: 'Completada', cantidad: 95 }, { fecha: '2026-08-03', sector: 'Sur', estado: 'Pendiente', cantidad: 45 }]; }
  obtenerEstadisticasCompost(): ReporteCompost[] { return [{ lote: 'LOT-001', cantidad: 350, estado: 'Disponible', fecha: '2026-08-01' }, { lote: 'LOT-002', cantidad: 500, estado: 'Maduración', fecha: '2026-08-03' }]; }
  obtenerIncidencias(): ReporteIncidencia[] { return [{ tipo: 'Contenedor lleno', estado: 'Pendiente', fecha: '2026-08-02' }, { tipo: 'Ruta bloqueada', estado: 'En proceso', fecha: '2026-08-03' }]; }
}
