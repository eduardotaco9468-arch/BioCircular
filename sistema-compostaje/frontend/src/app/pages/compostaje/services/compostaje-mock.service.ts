import { Injectable } from '@angular/core';
import { Compostaje } from '../interfaces/compostaje.interface';

@Injectable({ providedIn: 'root' })
export class CompostajeMockService {
  private registros: Compostaje[] = [
    { id: 1, lote: 'Lote-001', proceso: 'Descomposición', temperatura: 58, humedad: 62, estado: 'Activo', observaciones: 'Volteo programado para mañana.' },
    { id: 2, lote: 'Lote-002', proceso: 'Maduración', temperatura: 34, humedad: 48, estado: 'Activo', observaciones: 'Condiciones estables.' },
    { id: 3, lote: 'Lote-003', proceso: 'Finalizado', temperatura: 26, humedad: 35, estado: 'Finalizado', observaciones: 'Listo para tamizado.' }
  ];
  getCompostajes(): Compostaje[] { return [...this.registros]; }
  crearCompostaje(registro: Omit<Compostaje, 'id'>): Compostaje { const nuevo = { id: Math.max(0, ...this.registros.map(item => item.id)) + 1, ...registro }; this.registros.push(nuevo); return nuevo; }
  actualizarCompostaje(id: number, registro: Omit<Compostaje, 'id'>): Compostaje | null { const indice = this.registros.findIndex(item => item.id === id); if (indice === -1) return null; this.registros[indice] = { id, ...registro }; return this.registros[indice]; }
  eliminarCompostaje(id: number): boolean { const indice = this.registros.findIndex(item => item.id === id); if (indice === -1) return false; this.registros.splice(indice, 1); return true; }
}
