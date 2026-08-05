import { Injectable } from '@angular/core';
import { Mantenimiento } from '../models/mantenimiento.model';

@Injectable({ providedIn: 'root' })
export class MantenimientoService {
  private mantenimientos: Mantenimiento[] = [
    { id: 1, vehiculoId: 1, fecha: new Date(), tipo: 'Preventivo', descripcion: 'Cambio de aceite del motor', costo: 120, estado: 'Finalizado' },
    { id: 2, vehiculoId: 2, fecha: new Date(), tipo: 'Correctivo', descripcion: 'Revisión sistema eléctrico', costo: 250, estado: 'Pendiente' }
  ];
  obtenerTodos(): Mantenimiento[] { return [...this.mantenimientos]; }
  obtenerPorId(id: number): Mantenimiento | undefined { return this.mantenimientos.find(mantenimiento => mantenimiento.id === id); }
  crear(datos: Omit<Mantenimiento, 'id'>): Mantenimiento { const nuevo = { id: Math.max(0, ...this.mantenimientos.map(item => item.id)) + 1, ...datos }; this.mantenimientos.push(nuevo); return nuevo; }
  actualizar(mantenimiento: Mantenimiento): void { const indice = this.mantenimientos.findIndex(item => item.id === mantenimiento.id); if (indice !== -1) this.mantenimientos[indice] = mantenimiento; }
  eliminar(id: number): void { this.mantenimientos = this.mantenimientos.filter(mantenimiento => mantenimiento.id !== id); }
}
