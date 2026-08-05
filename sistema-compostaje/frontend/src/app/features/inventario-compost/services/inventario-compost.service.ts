import { Injectable } from '@angular/core';
import { InventarioCompost } from '../models/inventario-compost.model';
@Injectable({ providedIn: 'root' })
export class InventarioCompostService {
  private registros: InventarioCompost[] = [{ id: 1, lote: 'LOT-001', fechaProduccion: new Date(), cantidad: 350, unidad: 'kg', estado: 'Disponible', ubicacion: 'Bodega A' }];
  obtenerTodos(): InventarioCompost[] { return [...this.registros]; }
  obtenerPorId(id: number): InventarioCompost | undefined { return this.registros.find(registro => registro.id === id); }
  crear(datos: Omit<InventarioCompost, 'id'>): InventarioCompost { const nuevo = { id: Math.max(0, ...this.registros.map(item => item.id)) + 1, ...datos }; this.registros.push(nuevo); return nuevo; }
  actualizar(id: number, datos: Omit<InventarioCompost, 'id'>): InventarioCompost | undefined { const indice = this.registros.findIndex(registro => registro.id === id); if (indice === -1) return undefined; this.registros[indice] = { id, ...datos }; return this.registros[indice]; }
  eliminar(id: number): boolean { const indice = this.registros.findIndex(registro => registro.id === id); if (indice === -1) return false; this.registros.splice(indice, 1); return true; }
}
