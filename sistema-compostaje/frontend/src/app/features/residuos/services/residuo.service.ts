import { Injectable } from '@angular/core';
import { Residuo } from '../models/residuo.model';

@Injectable({ providedIn: 'root' })
export class ResiduoService {
  private residuos: Residuo[] = [
    { id: 1, nombre: 'Restos de alimentos', descripcion: 'Desechos biodegradables de cocina.', tipo: 'Orgánico', estado: 'Activo' },
    { id: 2, nombre: 'Botellas PET', descripcion: 'Envases plásticos reciclables.', tipo: 'Plástico', estado: 'Activo' }
  ];
  obtenerTodos(): Residuo[] { return [...this.residuos]; }
  obtenerPorId(id: number): Residuo | undefined { return this.residuos.find(residuo => residuo.id === id); }
  crear(datos: Omit<Residuo, 'id'>): Residuo { const nuevo = { id: Math.max(0, ...this.residuos.map(item => item.id)) + 1, ...datos }; this.residuos.push(nuevo); return nuevo; }
  actualizar(id: number, datos: Omit<Residuo, 'id'>): Residuo | undefined { const indice = this.residuos.findIndex(residuo => residuo.id === id); if (indice === -1) return undefined; this.residuos[indice] = { id, ...datos }; return this.residuos[indice]; }
  eliminar(id: number): boolean { const indice = this.residuos.findIndex(residuo => residuo.id === id); if (indice === -1) return false; this.residuos.splice(indice, 1); return true; }
}
