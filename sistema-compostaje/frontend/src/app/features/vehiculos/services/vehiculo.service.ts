import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  private vehiculos: Vehiculo[] = [{ id: 1, placa: 'ABC-1234', tipo: 'Camión', estado: 'Disponible' }];
  obtenerTodos(): Vehiculo[] { return [...this.vehiculos]; }
  obtenerPorId(id: number): Vehiculo | undefined { return this.vehiculos.find(vehiculo => vehiculo.id === id); }
  crear(vehiculo: Omit<Vehiculo, 'id'>): Vehiculo { const nuevo = { id: Math.max(0, ...this.vehiculos.map(item => item.id)) + 1, ...vehiculo }; this.vehiculos.push(nuevo); return nuevo; }
  actualizar(id: number, cambios: Omit<Vehiculo, 'id'>): Vehiculo | undefined { const indice = this.vehiculos.findIndex(vehiculo => vehiculo.id === id); if (indice === -1) return undefined; this.vehiculos[indice] = { id, ...cambios }; return this.vehiculos[indice]; }
  eliminar(id: number): boolean { const indice = this.vehiculos.findIndex(vehiculo => vehiculo.id === id); if (indice === -1) return false; this.vehiculos.splice(indice, 1); return true; }
}
