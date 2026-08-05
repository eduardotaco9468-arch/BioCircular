import { Injectable } from '@angular/core';
import { Contenedor } from '../models/contenedor.model';

@Injectable({ providedIn: 'root' })
export class ContenedorService {
  private contenedores: Contenedor[] = [
    { id: 1, codigo: 'CON-001', capacidad: 120, estado: 'Disponible' }
  ];

  obtenerTodos(): Contenedor[] { return [...this.contenedores]; }
  obtenerPorId(id: number): Contenedor | undefined { return this.contenedores.find(contenedor => contenedor.id === id); }
  crear(contenedor: Omit<Contenedor, 'id'>): Contenedor {
    const nuevo = { id: Math.max(0, ...this.contenedores.map(item => item.id)) + 1, ...contenedor };
    this.contenedores.push(nuevo);
    return nuevo;
  }
  actualizar(id: number, cambios: Omit<Contenedor, 'id'>): Contenedor | undefined {
    const indice = this.contenedores.findIndex(contenedor => contenedor.id === id);
    if (indice === -1) return undefined;
    this.contenedores[indice] = { id, ...cambios };
    return this.contenedores[indice];
  }
  eliminar(id: number): boolean {
    const indice = this.contenedores.findIndex(contenedor => contenedor.id === id);
    if (indice === -1) return false;
    this.contenedores.splice(indice, 1);
    return true;
  }
}
