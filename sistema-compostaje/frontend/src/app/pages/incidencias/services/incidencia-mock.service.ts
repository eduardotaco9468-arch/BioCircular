import { Injectable } from '@angular/core';
import { Incidencia } from '../interfaces/incidencia.interface';

@Injectable({ providedIn: 'root' })
export class IncidenciaMockService {
  private incidencias: Incidencia[] = [
    { id: 1, titulo: 'Contenedor lleno', descripcion: 'El contenedor del sector Centro alcanzó su capacidad.', prioridad: 'Alta', estado: 'Abierta', responsable: 'Carlos Mendoza', fecha: '2026-08-01' },
    { id: 2, titulo: 'Retraso en ruta', descripcion: 'La ruta Norte inició con retraso por mantenimiento.', prioridad: 'Media', estado: 'En proceso', responsable: 'Ana Torres', fecha: '2026-08-03' },
    { id: 3, titulo: 'Acceso bloqueado', descripcion: 'No fue posible acceder al punto de recolección.', prioridad: 'Baja', estado: 'Cerrada', responsable: 'Luis Vega', fecha: '2026-08-04' }
  ];

  getIncidencias(): Incidencia[] { return [...this.incidencias]; }

  crearIncidencia(incidencia: Omit<Incidencia, 'id'>): Incidencia {
    const nuevaIncidencia = { id: Math.max(0, ...this.incidencias.map(item => item.id)) + 1, ...incidencia };
    this.incidencias.push(nuevaIncidencia);
    return nuevaIncidencia;
  }

  actualizarIncidencia(id: number, incidencia: Omit<Incidencia, 'id'>): Incidencia | null {
    const indice = this.incidencias.findIndex(item => item.id === id);
    if (indice === -1) return null;
    this.incidencias[indice] = { id, ...incidencia };
    return this.incidencias[indice];
  }

  eliminarIncidencia(id: number): boolean {
    const indice = this.incidencias.findIndex(item => item.id === id);
    if (indice === -1) return false;
    this.incidencias.splice(indice, 1);
    return true;
  }
}
