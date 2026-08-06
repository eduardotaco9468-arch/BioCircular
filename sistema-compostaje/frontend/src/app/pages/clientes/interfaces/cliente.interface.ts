export interface Cliente {
  id?: number;
  nombre: string;
  tipoCliente: string;
  identificacion: string;
  telefono: string;
  correo: string;
  direccion: string;
  sector: string;
  estado: boolean;
  fechaRegistro?: string;
}
