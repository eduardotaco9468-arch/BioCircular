export interface Recoleccion {
  id: number;
  clienteId: number;
  operadorId: number | null;
  vehiculoId: number | null;
  fechaProgramada: string;
  fechaRealizada: string | null;
  estado: EstadoRecoleccion;
  pesoRecolectado: number | null;
  unidad: string;
  observaciones: string | null;
}

export type EstadoRecoleccion = 'PENDIENTE' | 'EN_PROCESO' | 'REALIZADA' | 'CANCELADA';

export interface RecoleccionRequest {

  clienteId: number;

  operadorId: number | null;

  vehiculoId: number | null;

  fechaProgramada: string;

  fechaRealizada: string | null;

  estado: string;

  pesoRecolectado: number | null;

  unidad: string;

  observaciones: string | null;

}
