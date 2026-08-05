export interface Reporte {
  id: number;
  titulo: string;
  valor: number;
  descripcion: string;
  tipo: string;
}

export interface ReporteRecoleccion { fecha: string; sector: string; estado: string; cantidad: number; }
export interface ReporteCompost { lote: string; cantidad: number; estado: string; fecha: string; }
export interface ReporteIncidencia { tipo: string; estado: string; fecha: string; }
