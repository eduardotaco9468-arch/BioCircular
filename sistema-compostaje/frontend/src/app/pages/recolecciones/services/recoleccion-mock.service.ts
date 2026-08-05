import { Injectable } from '@angular/core';

import { Recoleccion } from '../interfaces/recoleccion.interface';

@Injectable({ providedIn: 'root' })
export class RecoleccionMockService {
  private recolecciones: Recoleccion[] = [
    { id: 1, cliente: 'Juan Pérez', operador: 'Carlos Mendoza', vehiculo: 'CAM-001', fecha: '2026-08-01', peso: 125.5, estado: 'Completada' },
    { id: 2, cliente: 'Empresa Verde S.A.', operador: 'Ana Torres', vehiculo: 'CAM-002', fecha: '2026-08-03', peso: 280, estado: 'Pendiente' },
    { id: 3, cliente: 'María López', operador: 'Carlos Mendoza', vehiculo: 'CAM-001', fecha: '2026-08-04', peso: 74.25, estado: 'Cancelada' }
  ];

  getRecolecciones(): Recoleccion[] {
    return [...this.recolecciones];
  }

  crearRecoleccion(recoleccion: Omit<Recoleccion, 'id'>): Recoleccion {
    const nuevoRegistro: Recoleccion = { id: Math.max(0, ...this.recolecciones.map(item => item.id)) + 1, ...recoleccion };
    this.recolecciones.push(nuevoRegistro);
    return nuevoRegistro;
  }

  actualizarRecoleccion(id: number, cambios: Omit<Recoleccion, 'id'>): Recoleccion | null {
    const indice = this.recolecciones.findIndex(recoleccion => recoleccion.id === id);
    if (indice === -1) return null;
    this.recolecciones[indice] = { id, ...cambios };
    return this.recolecciones[indice];
  }

  eliminarRecoleccion(id: number): boolean {
    const indice = this.recolecciones.findIndex(recoleccion => recoleccion.id === id);
    if (indice === -1) return false;
    this.recolecciones.splice(indice, 1);
    return true;
  }
}
